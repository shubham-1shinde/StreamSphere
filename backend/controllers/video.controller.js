import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const AllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    //const user = await User.findById(userId);

    const videos = await Video.aggregate([
        {
            $match:{
                isPublished: true
            }
        },
        {
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        }
    ])

    return res
    .status(200)
    .json(
         new ApiResponse(200, videos, "All videos fetched successfully")
    )
})

const upNextVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    const {videoId} = req.params;

    const video = await Video.findById(videoId); // do not pass above videoId directly in match

    const videos = await Video.aggregate([
        {
            $match:{
                _id: { $ne: video._id } // excludes that one specific video and give other all videos
            }
        },
        {
            $lookup:{
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $addFields:{
                username:{$arrayElemAt:['$owner.username', 0]},
                avatar:{$arrayElemAt:['$owner.avatar', 0]},
            }
        },
        {
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        }
    ])

    return res
    .status(200)
    .json(
         new ApiResponse(200, videos, "All upnext videos fetched successfully")
    )
})

const getMyAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

    //const user = await User.findById(userId);

    const videos = await Video.aggregate([
        {
            $match:{
                //owner : user._id, // do not pass userId beaacuse it is just is where as user._id is a id having document
                owner: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        }
    ])

    return res
    .status(200)
    .json(
         new ApiResponse(200, videos, "All videos of current user fetched successfully")
    )
})

const getUsersAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    const {username} = req.params;
    //TODO: get all videos based on query, sort, pagination

    const user = await User.findOne({username}); // pass{username} not username directly because it take object to filter and findOne

    const videos = await Video.aggregate([
        {
            $match:{
                owner: user._id
            }
        },
        {
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        }
    ])

    return res
    .status(200)
    .json(
         new ApiResponse(200, videos, "Users all videos of current user fetched successfully")
    )
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description, isPublished} = req.body
    // TODO: get video, upload to cloudinary, create video

    const videoLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath =  req.files?.thumbnail[0]?.path;

    console.log("videoLocalPath is: ",videoLocalPath);
    console.log("thumbnailLocalPath is: ",thumbnailLocalPath);

    if (!videoLocalPath || !thumbnailLocalPath) {
        throw new ApiError(400, "Video and thumbnail are required");
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath);
    const thumbnailFile = await uploadOnCloudinary(thumbnailLocalPath);

    if (!videoFile || !thumbnailFile) {
        throw new ApiError(400, "video and thumbnail file is required because not uploaded in cloudinary")
    }

    const video = await Video.create({
        videoFile: videoFile.secure_url,
        thumbnail: thumbnailFile.secure_url,
        title,
        description,
        duration: videoFile.duration, 
        isPublished,
        views: 0, 
        owner: req.user._id 
    });

    if( !video) {
        throw new ApiError(500, "Failed to create video");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "video is published")
    )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const videos = await Video.aggregate([
        {
            $match:{
                _id: video._id
            }
        },
        {
            $lookup:{
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $addFields:{
                username:{$arrayElemAt:['$owner.username', 0]},
                avatar:{$arrayElemAt:['$owner.avatar', 0]},
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(200, videos , "Video details fetched successfully")
    )
})

const getSearchData = asyncHandler(async (req, res) => {

    const { data } = req.body

    const video = await Video.findOne({title: data});
    if (video) {
        const videos = await Video.aggregate([
        {
            $match:{
                _id: video._id
            }
        },
        {
            $lookup:{
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $addFields:{
                username:{$arrayElemAt:['$owner.username', 0]},
                avatar:{$arrayElemAt:['$owner.avatar', 0]},
            }
        }
    ])
    console.log(videos)

    return res
    .status(200)
    .json(
        new ApiResponse(200, videos , "Searched video details fetched successfully")
    )
    }

    const user = await User.findOne({username: data})
    if (user) {
        const channel = await User.aggregate([
        {
            $match: {
                username: user.username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1,
            }
        }
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(200, channel , "Searched channel details fetched successfully")
    )
    }

    return res
    .status(400)
    .json(
        new ApiResponse(400, "Invalid Search")
    )
    
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    // get video by id
    // check if video exists
    // upload new video on cloudinary if provided
    // update video details

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const { title, description } = req.body;
    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath && !thumbnailLocalPath) {
        throw new ApiError(400, "At least one of video or thumbnail is required");
    }

    const newVideoFile = await uploadOnCloudinary(videoLocalPath);
    const newthumbnailFile = await uploadOnCloudinary(thumbnailLocalPath);

     if (!newVideoFile || !newthumbnailFile) {
        throw new ApiError(400, "new video and thumbnail file is required because not uploaded in cloudinary")
    }

    const updatedVideoData = await Video.findByIdAndUpdate(
        video._id,
        {
            $set:{
                title,
                description,
                videoFile: newVideoFile.secure_url,
                thumbnail: newthumbnailFile.secure_url,
                duration:  newVideoFile.duration, 
                isPublished: true,
                views: 0, 
                owner: req.user._id 
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedVideoData, "video is updated successfully")
    )


})

const addView = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    // get video by id
    // check if video exists
    // upload new video on cloudinary if provided
    // update video details

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    
    const updatedVideoView = await Video.findByIdAndUpdate(
        video._id,
        { $inc: { views: 1 } },
        {new: true}
    ).select("-title -description -createdAt -updatedAt -videoFile -thumbnail -owner -isPublished -duration -_id -__v")

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedVideoView, "video is updated successfully")
    )


})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video

    const video = await Video.findByIdAndDelete(videoId);

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "video is deleted successfully")
    )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) {
            throw new ApiError(404, "Video not found");
        }

    const publishStatus = video.isPublished;
    
    if(publishStatus){
        const changePublishStaus = await Video.findByIdAndUpdate(
            videoId,
            {
                $set: {
                    isPublished: false,
                }
            },
            {new: true}
        )

        return res
        .status(200)
        .json(
            new ApiResponse(200, changePublishStaus, "Now video is Unpublished")
        )
    } else if (!publishStatus){
        const changePublishStaus = await Video.findByIdAndUpdate(
            videoId,
            {
                $set: {
                    isPublished: true,
                }
            },
            {new: true}
        )

        return res
        .status(200)
        .json(
            new ApiResponse(200, changePublishStaus, "Now video is Published")
        )
    }
    
})

export {
    AllVideos,
    getMyAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus, 
    addView,
    upNextVideos,
    getUsersAllVideos,
    getSearchData,
}