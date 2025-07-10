import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const likeStatus = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    })
    if (likeStatus) {
        await Like.deleteOne({ _id: likeStatus._id })
        return res.status(200).json(new ApiResponse(200, {}, "Like removed successfully from video"))
    } else if(!likeStatus) {
        const newLike = await Like.create({
            video: videoId,
            likedBy: req.user._id
        })
        if (!newLike) {
            throw new ApiError(500, "Failed to add like on video")
        }
        return res.status(200).json(new ApiResponse(200, newLike, "Like added successfully on video"))
    }
})

const totalVideoLikes = asyncHandler(async (req, res) => {
    const {videoId} = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const totalLikes = await Like.countDocuments({ video: videoId })

    return res.status(200).json(new ApiResponse(200, totalLikes, "total video likes fetched successfully"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const commentStatus = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id
    })
    if (commentStatus) {
        await Like.deleteOne({ _id: commentStatus._id })
        return res.status(200).json(new ApiResponse(200, "Like removed successfully from comment"))
    } else if(!commentStatus) {
        const newLike = await Like.create({
            comment: commentId,
            likedBy: req.user._id
        })
        if (!newLike) {
            throw new ApiError(500, "Failed to add like on comment")
        }
        return res.status(200).json(new ApiResponse(200, newLike, "Like added successfully on comment"))
    }

})

const totalCommentsLikes = asyncHandler(async (req, res) => {
    const {commentId} = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID")
    }

    const totalLikes = await Like.countDocuments({ comment: commentId })

    return res.status(200).json(new ApiResponse(200, totalLikes, "total comment likes fetched successfully"))
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }

    const tweetStatus = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id
    })
    if (tweetStatus) {
        await Like.deleteOne({ _id: tweetStatus._id })
        return res.status(200).json(new ApiResponse(200, "Like removed successfully from tweet"))
    } else if(!tweetStatus) {
        const newLike = await Like.create({
            tweet: tweetId,
            likedBy: req.user._id
        })
        if (!newLike) {
            throw new ApiError(500, "Failed to add like on tweet")
        }
        return res.status(200).json(new ApiResponse(200, newLike, "Like added successfully on tweet"))
    }
}
)

const totalTweetsLikes = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }
    const totalLikes = await Like.countDocuments({ tweet: tweetId })

    
    return res.status(200).json(new ApiResponse(200, totalLikes, "total tweet likes fetched successfully"))
    
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likedVideos = await Like.aggregate([
        { $match: { likedBy: req.user._id , }, },
        { $match: {
            video: { $exists: true } //very new thing
            }, 
        },
        {
            $lookup: {
                from: 'videos',
                localField: 'video',
                foreignField: '_id',
                as: 'video',
            }
        },
        {
            $addFields:{
                fullName:{$arrayElemAt:['$video.title', 0]},
                duration:{$arrayElemAt:['$video.duration', 0]},
                thumbnail:{$arrayElemAt:['$video.thumbnail', 0]},
                views:{$arrayElemAt:['$video.views', 0]},
                username:{$arrayElemAt:['$video.username', 0]},
            }
        },
        
    ])
    return res.status(200).json(new ApiResponse(200, likedVideos))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
    totalVideoLikes,
    totalCommentsLikes,
    totalTweetsLikes,
}