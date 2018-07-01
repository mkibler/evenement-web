const mongoose = require('mongoose');
const Coordinates = require('./coordinates')

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    coords: {
      type: Coordinates,
      required: true
    },
  }
);

module.exports = mongoose.model('Event', EventSchema)