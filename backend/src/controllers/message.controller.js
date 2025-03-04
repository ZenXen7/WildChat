import Message from "../models/message.model.js";
import User from "../models/user.model.js";


export const getUsersForSiderbar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getting users for sidebar: ", error.message);
        res.status(500).json({message: 'Server error'});
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;
        
        const messages = await Message.find({
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    receiverId: myId
                },
            ]
        })
    } catch (error) {
        console.error("Error in getting messages: ", error.message);
        res.status(500).json({message: 'Server error'});
    }
}
