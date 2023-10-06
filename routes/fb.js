import { Router } from "express";
import {
    checkStatus, 
    sendMessage,
    sendPhoto
} from "../controller/fb.controller.js";

const router = Router();

router.get("/", checkStatus);

router.post("/message", sendMessage);

router.post("/photo", sendPhoto);

export default router;
