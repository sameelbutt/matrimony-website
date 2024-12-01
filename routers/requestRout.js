const express = require("express");
const router = express.Router();
const Request = require("../models/contactmodel"); // Adjust path as needed

// Post request to send a request
router.post("/send", async (req, res) => {
  try {
    const { receiver } = req.body;

    if (!receiver) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    // Assuming sender's ID is extracted from an authenticated user (e.g., req.user.id)
    const senderId = req.user ? req.user.id : null; // Adjust this if needed for your authentication logic

    if (!senderId) {
      return res.status(401).json({ error: "Unauthorized, sender ID missing" });
    }

    const newRequest = new Request({
      sender: senderId,
      receiver: receiver,
    });

    await newRequest.save();

    res
      .status(201)
      .json({ status: "success", message: "Request sent successfully" });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
