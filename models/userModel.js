import mongoose from 'mongoose';
import validator from 'validator';

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

const User = mongoose.model('User', UserSchema);
export default User;
