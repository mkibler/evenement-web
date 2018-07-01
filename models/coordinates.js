const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CoordinatesSchema = new Schema(
  {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
  }
);


/* function validateLatitude(l) {
  if (l < -90 || l > 90) {
    throw l + " is not valid latitude"
  }
}

function validateLongitude(l) {
  if (l < -180 || l > 180) {
    throw l + " is not valid longitude"
  }
} */

module.export = mongoose.model('Coordinates', CoordinatesSchema)