const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const sendEmail = require("../utils/SendEmail");

exports.signin = async (req, res, next) => {
  const {email, password} = req.body;

  if(!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const user = await User.findOne({email}).select("+password");

    if(!user) {
      return next(new ErrorResponse("Incorrect username or password", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if(!isMatch) {
      return next(new ErrorResponse("Incorrect username or password", 401));
    }

    sendToken(user, 200, res);

    return;
  }
  catch(error) {
    return next(error);
  }
};

exports.signup = async (req, res, next) => {
  const {username, email, password} = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password
    });

    console.log("User created");

    sendToken(user, 201, res);

    return;
  }
  catch(error) {
    return next(error);
  }
};

exports.forgotpassword = async (req, res, next) => {
  const {email} = req.body;

  try {
    const user = await User.findOne({email});

    if(!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetURL = `http://localhost:3000/resetpassword/${resetToken}`;
    console.log(resetURL);

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetURL} clicktracking=off>${resetURL}</a>
    `;

    console.log(message);

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message
      });

      res.status(200).json({
        success: true,
        data: "Email sent. Please check your email."
      });

      return;
    }
    catch {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  }
  catch(error) {
    next(error);
  }
};

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now()
      }
    });

    if(!user) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password reset successfully. Redirecting to sign in..."
    });

    return;
  }
  catch(error) {
    next(error);
  }
};

function sendToken(user, statusCode, res) {
  const token = user.getSignedToken();

  res.status(statusCode).json({
    success: true,
    token
  });

  console.log("Token sent");

  return;
}
