import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A project name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'A project name is required'],
      trim: true,
    },
    image: {
      public_id: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '',
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
