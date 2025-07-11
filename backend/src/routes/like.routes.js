import { Router } from 'express';
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
    totalVideoLikes,
    totalCommentsLikes,
    totalTweetsLikes,
    getUserIsLiked,
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/videos/:videoId").get(totalVideoLikes);
router.route("/comments/:commentId").get(totalCommentsLikes);
router.route("/tweets/:tweetId").get(totalTweetsLikes);
router.route("/videos").get(getLikedVideos);
router.route("/isliked/:videoId").get(getUserIsLiked);

export default router