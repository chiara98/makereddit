const Room = require('../models/room');

const rooms = Object.values(Room);

rooms.filter(function(room) {
  if(rooms.includes(room)){
    res.render("/rooms");
  }
})
