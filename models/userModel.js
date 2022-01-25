import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Please provide name`],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, `Please provide email`],
      validate: {
        validator: validator.isEmail,
        message: `Please provide a valid email`,
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, `Pleae provide password`],
      minlength: 6,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    location: {
      type: String,
      trim: true,
      maxlength: 20,
      default: 'my city',
    },
    numOfProjects: {
      type: Number,
      default: 0,
    },
    numOfBlogs: {
      type: Number,
      default: 0,
    },
    socials: [
      { linkedin: String },
      { github: String },
      { twitter: String },
      { discord: String },
      { phoneNumber: String },
    ],
    expectedCtc: String,
    noticePeriod: String,
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', UserSchema);
export default User;
