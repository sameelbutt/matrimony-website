const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hall: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hall',
    required: [true, 'Booking must belong to a hall']
  },
  user: {
    type: mongoose.Schema.ObjectId, 
    ref: 'HallUsers',
    required: [true, 'Booking must belong to a user']
  },
  // createdAt: Date.now,
  date: {
    type: Date,
    required: [true, 'Booking must have a date']
  }
});
bookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email'
  }).populate({
    path: 'hall',
    select: 'name'
  });
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
