// routes/Router.js
const express = require("express");
const { UserModel } = require("../models/User.model");
const { flightModel } = require("../models/Flight.Model");
const { bookingModel } = require("../models/Booking.Model");

const router = express.Router();

router.post("/register", async (req, res) => {
  const userDetail = req.body;
  try {
    const user = new UserModel(userDetail);
    await user.save();
    res.status(201).send({ msg: "User Registered" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email, pass });
    if (user.length > 0) {
      res.status(201).send({ msg: "Login Successful" });
    } else {
      res.send({ msg: "Wrong Credentials" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

router.post("/flights", async (req, res) => {
  const flightDetail = req.body;
  try {
    const flight = new flightModel(flightDetail);
    await flight.save();
    res.status(201).send({ msg: "Flight Details Added" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

router.get("/flights", async (req, res) => {
  try {
    const flight = await flightModel.find();
    res
      .status(200)
      .send({ msg: "Find the details of all flights", "All Flights": flight });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

router.get("/flights/:id", async (req, res) => {
  const flightID = req.params.id;
  try {
    const flight = await flightModel.findById(flightID);
    res
      .status(200)
      .send({ msg: "Find the details of this flight", "This Flight": flight });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

router.delete("/flights/:id", async (req, res) => {
  try {
    const flightID = req.params.id;
    const flight = await flightModel.findById(flightID);
    res.status(202).send({ msg: "Flight's detail deleted successfully" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

router.put("/flights/:id", async (req, res) => {
  try {
    const flightID = req.params.id;
    const {
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = req.body;

    const flights = await flightModel.findByIdAndUpdate(
      flightID,
      {
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        seats,
        price,
      },
      { new: true }
    );
    if (!flights) {
      res.send({ msg: "Flight not found" });
    }
    res.status(204).send({ msg: "Flight's detail updated successfully", flights });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});


router.get("/dashboard", async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    populate(
      "flight",
      "-_id airline flight No departure arrival departureTime arrivalTime seats price"
    ).populate("user", "id name email");
    res.status(200).send(bookings);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in retrieving bookings", error: err.message });
  }
});

router.post("/booking", async (req, res) => {
  try {
    const { userID, flightID } = req.body;
    if (!flightID || !userID) {
      return res
        .status(400).send({ msg: "Flight ID and User ID are required" });
    }
    const flight = await FlightModel.findById(flightID);
    if (!flight) {
      return res.status(404).send({ msg: "Flight not found" });
    }
    const existingBooking = await BookingModel.findOne({
      user: userID,
      flight: flightID,
    });
    if (existingBooking) {
      return res.status(400).send({ msg: "Flight already booked by the user" });
    }
    const booking = new BookingModel({ user: userID, flight: flightID });
    await booking.save();
    res.status(200).send({ msg: "Flight booked successfully", booking });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error in booking flight", error: err.message });
  }
});

module.exports = router ;
