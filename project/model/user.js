const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  /*   name: {
    type: String,
    required: [true, "Please tell us your name"],
  }, */
  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowerCase: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  /*  photo: String, */
  password: {
    type: String,
    required: [true, "Please tell us your password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please tell us your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not same",
    },
  },
  /*   passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  }, */
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
/* userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
}); */

userSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

/* userSchema.methods.correctPasswordAfter = async function (JWTTimestamp) {
  //console.log('------@@++____-----> ', this.passwordChangedAt);
  if (this.passwordChangedAt) {
    const changeTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //  console.log('------>>>', JWTTimestamp);
    return JWTTimestamp < changeTimestamp;
  }
  return false;
}; */

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  /*   console.log(
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    await bcrypt.compare(candidatePass, userPass)
  ); */
  return await bcrypt.compare(candidatePass, userPass);
};

/* userSchema.methods.correctPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
}; */

const user = mongoose.model("userer", userSchema);
module.exports = user;
