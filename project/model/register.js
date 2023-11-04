const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  adress: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  detail: {
    type: String,
    required: [true, "user required"],
  },
});
/* userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

userSchema.methods.correctPasswordAfter = async function (JWTTimestamp) {
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
};

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  /*   console.log(
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    await bcrypt.compare(candidatePass, userPass)
  ); */
/*
  return await bcrypt.compare(candidatePass, userPass);
};

userSchema.methods.correctPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
}; 
*/
const register = mongoose.model("register", registerSchema);
module.exports = register;
