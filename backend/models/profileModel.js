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
      required: false,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    description: {
      type: String,
    },
    specialisation: {
      type: String,
    },
    qualifications: {
      type: String,
    },
    isQualificationsVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    location: {
      type: String,
    },
    telephoneNumber: {
      type: String,
    },
    keyWordSearch: {
      type: String,
    },
    keyWordSearchOne: {
      type: String,
    },
    keyWordSearchTwo: {
      type: String,
    },
    keyWordSearchThree: {
      type: String,
    },
    keyWordSearchFour: {
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
