import mongoose from 'mongoose';

const property_schema = new mongoose.Schema(
  {
    current_owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tittle: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['beach', 'mountain', 'village', 'city'],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sqmeters: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Property = mongoose.model('Property', property_schema);
