import express from 'express';
import articleController from '../controllers/articleController.js';

const router = express.Router();

router.post("/:article_id/create",articleController.createComment);
router.post("/:article_id/update/:comment_id",articleController.updateComment);
router.get("/:article_id/delete/:comment_id",articleController.deleteComment);
router.get("/:article_id", articleController.getComments)
export default router;
