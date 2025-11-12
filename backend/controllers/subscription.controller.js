import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { channel } from "diagnostics_channel"
import { Video } from "../models/video.model.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const {username } = req.params;
    //console.log(videoId)
    // TODO: toggle subscription

    // get user from req.user
    // get toggleStatus from database
    // if true, then unsubscribe & delete subscription
    // if false, then subscribe & create subscription

    if(videoId) {
        const video = await Video.findOne({_id: videoId})
        const channel = await Subscription.findOne({channel: video.owner, subscriber: req.user._id});
        if (!channel) {
            // User is not subscribed to the channel, so subscribe
            const newSubscription = await Subscription.create({
                channel: video.owner,
                subscriber: req.user._id
            });
            return res
                .status(200)
                .json(
                    new ApiResponse(200, newSubscription, "Subscribed to channel successfully")
                );
        } else if (channel) {
            // User is already subscribed to the channel, so unsubscribe
            await Subscription.findOneAndDelete({channel: video.owner, subscriber: req.user._id})
            return res
                .status(200)
                .json(
                    new ApiResponse(200, {}, "Unsubscribed from channel successfully")
            );
        }

    } else if (username) {
       const user = await User.findOne({username});
        if (!user) {
            throw new ApiError(404, "User not found");
        } 
        const channel = await Subscription.findOne({channel: user._id, subscriber: req.user._id});
        if (!channel) {
            // User is not subscribed to the channel, so subscribe
            const newSubscription = await Subscription.create({
                channel: user._id,
                subscriber: req.user._id
            });
            return res
                .status(200)
                .json(
                    new ApiResponse(200, newSubscription, "Subscribed to channel successfully")
                );
        } else if (channel) {
            // User is already subscribed to the channel, so unsubscribe
            await Subscription.findOneAndDelete({channel: user._id, subscriber: req.user._id})
            return res
                .status(200)
                .json(
                    new ApiResponse(200, {}, "Unsubscribed from channel successfully")
            );
        }
    }

    
    
    

    /*const channel = await Subscription.findOne({channel: channelId || user._id, subscriber: req.user._id});
    if (!channel) {
        // User is not subscribed to the channel, so subscribe
        const newSubscription = await Subscription.create({
            channel: channelId,
            subscriber: req.user._id
        });
        return res
            .status(200)
            .json(
                new ApiResponse(200, newSubscription, "Subscribed to channel successfully")
            );
    } else if (channel) {
        // User is already subscribed to the channel, so unsubscribe
        await Subscription.findOneAndDelete({channel: channelId, subscriber: req.user._id})
        return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "Unsubscribed from channel successfully")
        );
    }
*/
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {

    const {channelId} = req.params;

   const allSubscribers = await Subscription.aggregate([
    {
        $match: {
            channel: new mongoose.Types.ObjectId(channelId)
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "subscriber",
            foreignField: "_id",
            as: "subscriberDetails",
          
        }
    },
     {
      $group: {
        _id: '$channel',
        totalSubscribers: { $sum: 1 },
        subscribers: { $push: {
            _id:      '$subscriberDetails._id',      
            username: '$subscriberDetails.username', 
            fullName: '$subscriberDetails.fullName',
            avatar:  '$subscriberDetails.avatar',
        }}
      }
    },
    {
      $project: {
        _id: 0,
        totalSubscribers: 1,
        subscribers: 1
      }
    }
   
   ])

   return res
   .status(200)
   .json(
        new ApiResponse(200, allSubscribers, "all subscribers")
   )

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {

    const allChannels = await Subscription.aggregate([
    {
        $match: {
            subscriber: new mongoose.Types.ObjectId(req.user._id)
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "channel",
            foreignField: "_id",
            as: "subscribedChannel",
          
        }
    },
    /* {
      $group: {
        _id: '$subscriber',
        totalsubscribedChannel: { $sum: 1 },
        channels: { $push: {
            _id:      '$subscribedChannel._id',      
            username: '$subscribedChannel.username', 
            fullName: '$subscribedChannel.fullName',
            avatar:  '$subscribedChannel.avatar',
        }}
      }
    },
    {
      $project: {
        _id: 0,
        totalsubscribedChannel: 1,
        channels: 1
      }
    }*/
   {
        $addFields:{
            fullName:{$arrayElemAt:['$subscribedChannel.fullName', 0]},
            username:{$arrayElemAt:['$subscribedChannel.username', 0]},
            avatar:{$arrayElemAt:['$subscribedChannel.avatar', 0]},
        }
    },
   
   ])

   return res
   .status(200)
   .json(
        new ApiResponse(200, allChannels, "all Channels")
   )

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}