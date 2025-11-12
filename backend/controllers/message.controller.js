import mongoose, {isValidObjectId} from "mongoose"
import {Message} from "../models/message.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"


const sendMessage = asyncHandler(async (req, res) => {

    const {content} = req.body
    const {username} = req.params

    const receiver = await User.findOne({username})   

    const newMessage = await Message.create({
        content,
        sender: req.user._id,
        receiver: receiver._id,
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, newMessage, "new message created")
    )

})

const getChatSidebar = asyncHandler(async (req, res) => {

    const receiverList = await Message.aggregate([
        {
            $match: {
                sender: req.user._id,
            }
        },
        {
            $group: {
            _id: "$receiver" // group by receiver ID
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "receiverDoc"
            }
        },
        { $unwind: "$receiverDoc" },

        // 4️⃣  shape the final output
        {
            $project: {
            _id: 1,                   // keep the receiver id if you still need it
            fullName: "$receiverDoc.fullName",
            username: "$receiverDoc.username",
            avatar:   "$receiverDoc.avatar"
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(200, receiverList, "new message created")
    )

})

const getChatwindow = asyncHandler(async (req, res) => {

    const {username} = req.params;

    const user = await User.findOne({username})

    const chats = await Message.aggregate([
        {
            $match: {
                $or: [
                    { sender: user._id,   receiver: req.user._id },
                    { sender: req.user._id, receiver: user._id }
                ]
            }
        },
        {
            $lookup:{
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'senderDoc',
            },
        },
        {
            $lookup:{
                from: 'users',
                localField: 'receiver',
                foreignField: '_id',
                as: 'receiverDoc',
            }
        },
        { $unwind: "$senderDoc" },
        { $unwind: "$receiverDoc" },
        {
            $project: {
            _id: 1,            
            content: 1,       // keep the receiver id if you still need it
            sender: "$receiverDoc",
            receiver: "$receiverDoc",
            }
        },
        { $sort: { createdAt: 1 } },
        
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(200, chats, "chats fetched successfully")
    )

})

const getreceiver = asyncHandler(async(req, res) => {
    const {username} = req.params;

    const user = await User.findOne({username}).select("-password -refreshToken");

    return res.status(200)
    .json(
        new ApiResponse(200, user, "receiver fetched successfully")
    )
})

export {
    sendMessage,
    getChatSidebar,
    getChatwindow,
    getreceiver,
}