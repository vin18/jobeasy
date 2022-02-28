import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
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

const Project = mongoose.model('Project', projectSchema);
export default Project;
