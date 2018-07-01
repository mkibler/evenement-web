// todo handle errors

const Event = require('../models/event')
const Coordinates = require('../models/coordinates')
const geolib = require('geolib')

const defaultDistance = 1000;

exports.post = function(req, res) {
  const e = Object.assign(new Event, req.body);
  e.save()
    .then(res.send(200))
    .catch((err) => {
      res.send(500) // todo handle different errors with code
    });
}

exports.list = function(req, res) {
  const coords = coordsFromReq(req)
  if (coords) {
    var distance = distanceFromReq(req)
    if (!distance) {
      distance = defaultDistance;
    }
    getNearEvents(coords, distance)
      .then((events) => {
        res.send(events);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    Event.find(function(err, events) {
      res.send(events)
    });
  }
}

function coordsFromReq(req) {
  if (req.query.lat || req.query.long) {
    return new Coordinates(req.query.lat, req.query.long)
  }
  return null;
}

// distance in meters
function distanceFromReq(req) {
  if (req.query.distance) {
    return distance
  }
  return null
}

// todo be more selective about selection before executing query
function getNearEvents(coords, distance) {
  return Event.find().exec()
    .then((events) => {
      return events.filter(e => {
        isInArea(e, coords, distance)
      })
    })
}

function isInArea(event, coords, maxDistance) {
  actualDistance = geolib.getDistance(event.coords, coords)
  if (actualDistance <= maxDistance) {
    return true;
  } else {
    return false;
  }
}