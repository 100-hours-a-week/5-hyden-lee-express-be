import express from 'express';
import articleController from '../controllers/articleController.js';
import AuthMiddleware from '../utils/AuthMiddleware.js';


const router = express.Router();

router.post("/:article_id/create",AuthMiddleware.isAuthenticated ,articleController.createComment);
router.post("/:article_id/update/:comment_id",AuthMiddleware.isAuthenticated, AuthMiddleware.isCommentOwned ,articleController.updateComment);
router.get("/:article_id/delete/:comment_id",AuthMiddleware.isAuthenticated, AuthMiddleware.isCommentOwned ,articleController.deleteComment);
router.get("/:article_id",AuthMiddleware.isAuthenticated ,articleController.getComments)
export default router;
