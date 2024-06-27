import express from 'express';
import articleController from '../controllers/articleController.js';
import {isAuthenticated} from "../utils/AuthMiddleware.js";

const router = express.Router();

router.post("/:article_id/create",isAuthenticated ,articleController.createComment);
router.post("/:article_id/update/:comment_id",isAuthenticated ,articleController.updateComment);
router.get("/:article_id/delete/:comment_id",isAuthenticated ,articleController.deleteComment);
router.get("/:article_id",isAuthenticated ,articleController.getComments)
export default router;
