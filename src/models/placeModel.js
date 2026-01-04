import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  googleMapsLink: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  roomPrice: {
    type: Number,
    default: 0,
  },
  roomStatus: {
    type: String,
    enum: ["available", "booked", "maintenance"],
    default: "available",
  },
  image: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Place = mongoose.model("Place", placeSchema);

export default Place;
