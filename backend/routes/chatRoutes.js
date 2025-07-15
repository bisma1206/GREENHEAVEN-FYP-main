import express from "express";
import { chatWithBot } from "../controllers/chatbotController.js";

const chatRouter = express.Router();
chatRouter.post("/chat", chatWithBot);
export default chatRouter;
