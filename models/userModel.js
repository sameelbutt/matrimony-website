const mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let slugify = require("slugify");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  FirstName: { type: String },
  LastName: { type: String },
  email: { type: String },
  password: { type: String, select: false },
  confirmpassword: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  phoneno: { type: String },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  age: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  martialstatus: {
    type: String,
    enum: ["single", "divorced"],
  },
  motheralive: {
    type: String,
    enum: ["yes", "no"],
  },
  fatheralive: {
    type: String,
    enum: ["yes", "no"],
  },
  brothers: { type: String },
  sisters: { type: String },
  photo: [String],
  slug: { type: String },
  religion: { type: String },
  sec: { type: String },
  doyoupreferhijab: {
    type: String,
    enum: ["yes", "no"],
  },
  doyoukeephala: {
    type: String,
    enum: ["yes", "no"],
  },
  height: { type: String },
  weight: { type: String },
  mybuilt: {
    type: String,
    enum: ["smart", "fat"],
  },
  haircolor: {
    type: String,
    enum: ["black", "brown", "white"],
  },
  qualification: { type: String },
  university: { type: String },
  cast: { type: String },
  job: { type: String },
  monthlyincome: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    if (!this.password) {
      console.error("Password is missing");
      throw new Error("Password is required");
    }

    console.log("Hashing password:", this.password); // Debug log
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmpassword = undefined;
    this.slug = slugify(`${this.FirstName} ${this.LastName}`, { lower: true });
    next();
  } catch (err) {
    console.error("Error in pre-save middleware:", err); // Debug log
    next(err);
  }
});
userSchema.methods.correctPassword = async (canditpassword, userpassword) => {
  return await bcrypt.compare(canditpassword, userpassword);
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};
let User = mongoose.model("User", userSchema);
module.exports = User;
