import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    if(!(name || description)) throw new ApiError(400, "name and description are required");

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    })

    if(!playlist) throw new ApiError(400, "playlist not created, something went wrong...");

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "playlist cretaed successfully")
    )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params

    const playlist = await Playlist.find({owner: userId})

    if (!playlist) throw new ApiError(400, "user's playlist doesn't exists")

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "user's playlist fetched successfully")
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) throw new ApiError(400, "user's playlist doesn't exists")

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "user's playlist by ID fetched successfully")
    )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    const video = await Video.findById(videoId)
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push: { videos: { $each: [video], $position: 0 } }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "video added to playlist successfully")
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    const video = await Video.findById(videoId)
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: { videos: videoId }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "video removed from playlist successfully")
    )

})

const getPlaylistVideos = asyncHandler(async (req, res) => {

    const {playlistId} = req.params

    const playlist = await Playlist.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(playlistId)   // can't pass req.user._id beacuse mongoose does not work in pipelines so we have to manuallay make mongDB ID.
                }
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "videos",
                    foreignField: "_id",
                    as: "AllPlaylistVideos",
                    pipeline: [
                        {
                            $lookup: {
                                from: "playlists",
                                localField: "owner",
                                foreignField: "_id",
                                as: "owner",
                                pipeline: [
                                    {
                                        $project: {
                                            fullName: 1,
                                            username: 1,
                                            avatar: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $addFields:{
                                owner:{
                                    $first: "$owner"
                                }
                            }
                        }
                    ]
                }
            }
        ])

    const videos = playlist.length > 0 ? playlist[0].AllPlaylistVideos : [];

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                videos,
                "All videos of playlist fetched successfully"
            )
        )
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    
    const playlist = await Playlist.findByIdAndDelete(playlistId)

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "playlist deleted successfully")
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: {
                name,
                description
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "playlist updated successfully")
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
    getPlaylistVideos
}