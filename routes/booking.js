const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// Route to create a new booking
router.post("/create-booking", async (req, res) => {
  const { name, phone, totalAmount, selectedPackages, quantities } = req.body;

  try {
    // Create a new booking record
    const newBooking = new Booking({
      name,
      phone,
      totalAmount,
      packages: selectedPackages.map((pkgId) => ({
        packageId: pkgId.id,
        quantity: quantities?.[pkgId.id] || 1, // Quantity from frontend (or default to 1)
        pricePerPerson: pkgId.price,
      })),
    });

    // Save the booking to the database
    await newBooking.save();

    // Send success response
    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking", error });
  }
});

module.exports = router;
