import { Router } from 'express';
import {
    getChatSidebar,
    sendMessage,
    getChatwindow,
    getreceiver,
    
} from "../controllers/message.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT);

router.route("/").get(getChatSidebar);
router.route("/:username").get(getChatwindow).post(sendMessage);
router.route("/g/:username").get(getreceiver);

export default router