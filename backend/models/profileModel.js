import mongoose from 'mongoose';

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    location: {
      type: String,
    },
    telephoneNumber: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
