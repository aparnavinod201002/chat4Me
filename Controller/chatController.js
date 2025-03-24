const Chats = require('../Model/chatShema'); // Adjust path based on your project structure
const mongoose = require("mongoose");
const User = require('../Model/userSchema')

exports.getChatUsers = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params); // Convert userId to ObjectId
        console.log("Fetching chats for userId:", userId);

        const chats = await Chats.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        }).select("senderId receiverId -_id"); // Fetch only senderId & receiverId

        console.log("Chats found:", chats);

        if (!chats.length) {
            return res.status(400).json({ message: "No chats found", users: [] });
        }

        let chatUserIds = new Set(); // Store unique user IDs

        chats.forEach(chat => {
            const senderId = chat.senderId.toString();
            const receiverId = chat.receiverId.toString();

            // Add the opposite user ID
            if (senderId === userId.toString()) {
                chatUserIds.add(receiverId);
            } else {
                chatUserIds.add(senderId);
            }
        });

        console.log("Unique Chat User IDs:", Array.from(chatUserIds));

        const users = await User.find(
            { _id: { $in: Array.from(chatUserIds) } },
            "username email"
        );

        console.log("Fetched Chat Users:", users);

        return res.status(200).json({
            users: users // Return user details instead of just IDs
        });

    } catch (error) {
        console.error("Error fetching chat users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};