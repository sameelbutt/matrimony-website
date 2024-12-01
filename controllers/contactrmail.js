const mongoose = require("mongoose");
const Request = require("../models/contactmodel");
const User = require("./../models/userModel");
const nodemailer = require("nodemailer");

// Send Request
exports.sendRequest = async (req, res, next) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    // Create new request
    const newRequest = await Request.create({
      sender: senderId,
      receiver: receiverId,
    });

    // Find the receiver user
    const receiver = await User.findById(receiverId);

    // Create the URL for accepting and rejecting the request
    const acceptUrl = `http://127.0.0.1:3000/api/v1/matrimony/accept?requestId=${newRequest._id}`;
    const rejectUrl = `http://127.0.0.1:3000/api/v1/matrimony/reject?requestId=${newRequest._id}`;

    // Send email to the receiver with buttons
    const emailMessage = `
      <p>This person (${req.user.FirstName} ${req.user.LastName}) wants to connect with you and wants your phone number.</p>
      <p>Do you accept this request?</p>
      <a href="${acceptUrl}" style="padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px;">Accept</a>
      <a href="${rejectUrl}" style="padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px;">Reject</a>
    `;

    // Send the email
    await sendEmail(receiver.email, "Matrimony Request", emailMessage);

    res
      .status(201)
      .json({ message: "Request sent successfully", data: newRequest });
  } catch (error) {
    next(error);
  }
};

// Accept Request
exports.acceptRequest = async (req, res, next) => {
  try {
    const { requestId } = req.query;

    // Validate requestId
    if (!requestId || !mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: "Invalid or missing Request ID" });
    }

    const request = await Request.findById(requestId).populate(
      "sender receiver"
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
    await request.save();

    const senderMessage = `Your request has been accepted! Contact: ${
      request.receiver.email
    } (Phone: ${request.receiver.phoneno || "Not available"})`;

    const receiverMessage = `Your request has been accepted! Contact: ${
      request.sender.email
    } (Phone: ${request.sender.phoneno || "Not available"})`;

    await sendEmail(request.sender.email, "Request Accepted", senderMessage);
    await sendEmail(
      request.receiver.email,
      "Request Accepted",
      receiverMessage
    );

    res.status(200).json({ message: "Request accepted", data: request });
  } catch (error) {
    next(error);
  }
};

// Reject Request
exports.rejectRequest = async (req, res, next) => {
  try {
    const { requestId } = req.query;

    if (!requestId || !mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: "Invalid or missing Request ID" });
    }

    const request = await Request.findById(requestId).populate("sender");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "rejected";
    await request.save();

    await sendEmail(
      request.sender.email,
      "Request Rejected",
      "Your request has been denied."
    );

    res.status(200).json({ message: "Request rejected", data: request });
  } catch (error) {
    next(error);
  }
};

// Email Sending Function
const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "keith65609@gmail.com", // Replace with your email
      pass: "rhmookvqvxnwbkev", // Replace with your app password
    },
  });

  await transporter.sendMail({
    from: "keith65609@gmail.com", // Replace with your email
    to,
    subject,
    html: htmlContent,
  });
};
