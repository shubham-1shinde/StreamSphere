import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid video id")
    }
    const comments = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        
    ])

    res.status(200).json(new ApiResponse(200, comments, "All comments fetched successfully"))
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video

    const {videoId} = req.params
    const {content} = req.body

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id
    })
    if(!comment){
        throw new ApiError(400, "Failed to add comment")
    }

    res.status(200).json(new ApiResponse(200, comment, "Comment added successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment

    const {commentId} = req.params
    const {content} = req.body

    const comment = await Comment.findById(commentId)
    if(comment.owner.toString() === req.user._id.toString()){
        const updateComment = await Comment.findByIdAndUpdate(
            commentId,
            {
                $set: {
                    content
                }
            },
            {new: true}
        )
        if(!updateComment){
            throw new ApiError(404, "Comment not found")
        }

        return res.status(200).json(new ApiResponse(200, updateComment, "Comment updated successfully"))
    }
    throw new ApiError(403, "You are not authorized to update this comment")
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params
    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404, "Comment not found")
    }

    if(comment.owner.toString() === req.user._id.toString()){
        await Comment.findByIdAndDelete(commentId)
        return res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"))
    }
    throw new ApiError(403, "You are not authorized to delete this comment")
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }