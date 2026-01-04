import Place from "../models/placeModel.js";
import { uploadRemover } from "../utils/uploadRemover.js";

export const getPlace = async (req, res) => {
  try {
    const places = await Place.find();
    return res.status(200).json({ message: "get place", data: places });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const getPlaceById = async (req, res) => {
  const placeId = req.params.id;

  try {
    const places = await Place.findById(placeId);
    if (!places) {
      return res.status(404).json({ message: "place not found" });
    }
    return res.status(200).json({ message: "get place by id", data: places });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const createPlace = async (req, res) => {
  const { name, description, googleMapsLink, address, roomPrice, roomStatus } = req.body;
  const file =
    req.file ||
    (req.files?.image && req.files.image[0]) ||
    (req.files?.images && req.files.images[0]);
  const image = file ? file.filename : null;

  try {
    const places = new Place({
      name,
      description,
      googleMapsLink,
      image,
      address,
      roomPrice: roomPrice ? Number(roomPrice) : 0,
      roomStatus: roomStatus || "available",
    });
    const savePlace = await places.save();
    return res.status(201).json({ message: "create place", data: savePlace });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updatePlace = async (req, res) => {
  const placeId = req.params.id;
  const { name, description, googleMapsLink, address, roomPrice, roomStatus } = req.body;
  const file =
    req.file ||
    (req.files?.image && req.files.image[0]) ||
    (req.files?.images && req.files.images[0]);
  const newImage = file ? file.filename : null;

  try {
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    if (newImage && place.image) {
      uploadRemover(place.image);
    }

    if (name !== undefined) place.name = name;
    if (address !== undefined) place.address = address;
    if (description !== undefined) place.description = description;
    if (googleMapsLink !== undefined) place.googleMapsLink = googleMapsLink;
    if (roomPrice !== undefined) place.roomPrice = Number(roomPrice);
    if (roomStatus !== undefined) place.roomStatus = roomStatus;
    place.image = newImage ? newImage : place.image;

    const updatedPlace = await place.save();
    return res
      .status(200)
      .json({ message: "Update place", data: updatedPlace });
  } catch (error) {
    return res.status(500).json({ message: "Error updating place" });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlace = await Place.findByIdAndDelete(id);

    if (!deletedPlace) {
      return res.status(404).json({ message: "Tempat tidak ditemukan" });
    }

    res.json({
      message: "Tempat berhasil dihapus",
      data: deletedPlace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
