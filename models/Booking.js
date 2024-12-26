const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  packages: [
    {
      packageId: { type: Number, required: true },
      quantity: { type: Number, required: true },
      pricePerPerson: { type: Number, required: true },
    },
  ],
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
