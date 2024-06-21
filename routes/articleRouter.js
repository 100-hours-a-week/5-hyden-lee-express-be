import express from 'express';
import articleController from '../controllers/articleController.js';

const app = express()

import multer from "multer";

const upload = multer({
    dest: 'files/',
})
const uploadMiddleware = upload.single("profileImg");

app.use(uploadMiddleware);
const router = express.Router();

router.post("/create",upload.single("article_image"),articleController.createArticle);
router.post("/update/:article_id",upload.single("article_image"),articleController.updateArticle);
router.get("/delete/:article_id",articleController.deleteArticle);
router.post("/comment/:article_id/create",articleController.createComment);
router.get("/:article_id", articleController.getArticle)
router.get("/", articleController.getArticleList)
export default router;
