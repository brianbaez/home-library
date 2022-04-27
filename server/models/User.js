const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const entrySchema = mongoose.Schema({
  date: {
    month: Number,
    day: Number,
    year: Number
  },
  pagesReadSession: Number,
  pagesReadTotal: Number,
  note: {
    type: String,
    default: ""
  }
});

const reviewSchema = mongoose.Schema({
  rating: {
    wholeNumber: {
      type: Number,
      default: -1
    },
    decimalNumber: {
      type: Number,
      default: -1
    },
  },
  text: {
    type: String,
    default: ""
  }
});

const bookSchema = mongoose.Schema({
  title: String,
  author: [String],
  description: {
    type: String,
    default: ""
  },
  isbn: Number,
  pages: Number,
  cover: {
    type: String,
    default: "https://fr-lib.ru/tpl/images/noimage.jpg"
  },
  status: {
    type: String,
    default: ""
  },
  review: {
    type: reviewSchema,
    default: {}
  },
  bookshelves: {
    type: [String]
  },
  journal: {
    type: [entrySchema]
  }
});

const librarySchema = mongoose.Schema({
  books: {
    type: [bookSchema]
  }
});

const goalSchema = mongoose.Schema({
  year: Number,
  bookGoal: Number,
  pageGoal: Number,
  booksCompleted: {
    type: Number,
    default: 0
  },
  pagesCompleted: {
    type: Number,
    default: 0
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  library: {
    type: librarySchema,
    default: {}
  },
  challenges: {
    type: [goalSchema]
  }
});

UserSchema.pre("save", async function(next) {
  if(!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.matchPasswords = async function(password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function() {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}

UserSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

  return resetToken;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
