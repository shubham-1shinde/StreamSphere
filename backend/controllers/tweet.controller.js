import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const allTweets = asyncHandler(async (req, res) => {

    const tweets = await Tweet.aggregate([
        {
            $match:{}
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner',
            }
        },
        {
            $addFields:{
                fullName:{$arrayElemAt:['$owner.fullName', 0]},
                username:{$arrayElemAt:['$owner.username', 0]},
                avatar:{$arrayElemAt:['$owner.avatar', 0]},
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(200, tweets, "all tweets")
    )
})

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet

    const  {content}  = req.body //sended by postman via raw method
    if(!content){
        throw new ApiError(400, "content required")
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user._id 
    })
    if(!tweet){
        throw new ApiError(400, "tweet not created")
    }

    return res.status(200).json(
        new ApiResponse(200, tweet, "tweet is published")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets

    const {username} = req.params

    const user = await User.findOne({username})


    const tweets = await Tweet.aggregate([
        {
            $match:{
                owner: user._id
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner',
            }
        },
        {
            $addFields:{
                fullName:{$arrayElemAt:['$owner.fullName', 0]},
                username:{$arrayElemAt:['$owner.username', 0]},
                avatar:{$arrayElemAt:['$owner.avatar', 0]},
            }
        }
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(200, tweets, "user's all tweets") 
    )
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params;
    const {content} = req.body;

    const tweet = await Tweet.findById(tweetId)
    if(tweet.owner.toString() === req.user._id.toString()){
        const updateTweet = await Tweet.findByIdAndUpdate(
            tweetId,
            {
                $set:{
                    content,
                }
            },
            {new: true}
        )

        return res
        .status(200)
        .json(
            new ApiResponse(200, updateTweet, "user's tweet is updated") 
        )
    }

    throw new ApiError(403, "You are not authorized to update this tweet")

    
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet

    const {tweetId} = req.params;
    

    const tweet = await Tweet.findById(tweetId);
    if(tweet.owner.toString() === req.user._id.toString()){
        const deleteTweet = await Tweet.findOneAndDelete(tweetId)

        return res
        .status(200)
        .json(
            new ApiResponse(200, deleteTweet, "user's tweet is deleted") 
        )
    }
    throw new ApiError(403, "You are not authorized to delete this tweet")

})

export {
    allTweets,
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}