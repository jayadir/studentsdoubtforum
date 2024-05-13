const express = require("express");
const app = express();
const admin = require("../config/firebaseConfig");
app.use(express.json());
exports.subscribe = async (req, res) => {
  const { token, topic } = req.body;
  try {
    await admin.messaging().subscribeToTopic(token, topic);
    res.status(200).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.sendMessage = () => {
  const message = {
    notification: {
      title: "New Question Added",
      body: "A new question has been added. Check it out!",
    },
    topic: "newQuestion",
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};
