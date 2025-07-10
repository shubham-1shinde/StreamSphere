import { Router } from 'express';
import {
    AllVideos,
} from "../controllers/video.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(AllVideos)

 export default router