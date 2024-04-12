const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  id_number: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Hashing password before saving
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function() {
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
