const Message = require('../models/Message'); // Ensure you have this model
const User = require('../models/User'); // Ensure you have this model

exports.sendMessage = async (req, res) => {
  const { profileId } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  try {
    const newMessage = new Message({
      sender: req.user._id,
      receiver: profileId,
      text: message
    });

    await newMessage.save();
    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getMessages = async (req, res) => {
  const { profileId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: profileId },
        { sender: profileId, receiver: req.user._id }
      ]
    }).populate('sender', 'FirstName LastName').populate('receiver', 'FirstName LastName');

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
