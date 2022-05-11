const User = require("../../models/User");
const ErrorResponse = require("../../utils/ErrorResponse");
const {checkUser} = require("./helper");

exports.getUserData = async (req, res, next) => {
  const userData = req.user;

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to get user data", 401));
    }

    res.status(200).json({
      success: true,
      message: "User data sent",
      data: {
        id: userData._id,
        email: userData.email,
        username: userData.username
      }
    });
  }
  catch {
    return next(new ErrorResponse("Failed to get user data", 401));
  }
}

exports.updateEmail = async (req, res, next) => {
  const userData = req.user;
  const {newEmail} = req.body;

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to update user email", 401));
    }

    if(newEmail === userData.email) {
      return next(new ErrorResponse("Please provide a different email"));
    }

    // Update user email
    await User.updateOne(
      {"_id": userData._id},
      {$set: {"email": newEmail}}
    );

    res.status(200).json({
      success: true,
      message: "Email has been updated"
    });
  }
  catch {
    return next(new ErrorResponse("Failed to update user email", 401));
  }
}

exports.updateUsername = async (req, res, next) => {
  const userData = req.user;
  const {newUsername} = req.body;

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to update username", 401));
    }

    if(newUsername === userData.username) {
      return next(new ErrorResponse("Please provide a different username"));
    }

    // Update username
    await User.updateOne(
      {"_id": userData._id},
      {$set: {"username": newUsername}}
    );

    res.status(200).json({
      success: true,
      message: "Username has been updated"
    });
  }
  catch {
    return next(new ErrorResponse("Failed to update username", 401));
  }
}

exports.updatePassword = async (req, res, next) => {
  const userData = req.user;
  const {newPassword} = req.body;

  try {
    const user = await checkUser(userData._id);

    if(!user) {
      return next(new ErrorResponse("Failed to update password", 401));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      successs: true,
      message: "Password reset successfully"
    })
  }
  catch {
    return next(new ErrorResponse("Failed to update password", 401));
  }
}

exports.deleteAccount = async (req, res, next) => {
  const userData = req.user;

  try {
    if(!(await checkUser(userData._id))) {
      return next(new ErrorResponse("Failed to delete account", 401));
    }

    // Delete user account
    await User.findOneAndRemove(
      {"_id": userData._id}
    );

    res.status(200).json({
      success: true,
      message: "Account has been deleted"
    });
  }
  catch {
    return next(new ErrorResponse("Failed to delete account", 401));
  }
}
