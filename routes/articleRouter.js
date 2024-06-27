import express from 'express';
import articleController from '../controllers/articleController.js';
import AuthMiddleware from '../utils/AuthMiddleware.js';

const app = express()

import multer from "multer";

const upload = multer({
    dest: 'files/',
})
const uploadMiddleware = upload.single("profileImg");

app.use(uploadMiddleware);
const router = express.Router();

router.post("/create",upload.single("article_image"), AuthMiddleware.isAuthenticated, articleController.createArticle);
router.post("/update/:article_id",upload.single("article_image"), AuthMiddleware.isAuthenticated, AuthMiddleware.isArticleOwned, articleController.updateArticle);
router.get("/delete/:article_id", AuthMiddleware.isAuthenticated, AuthMiddleware.isArticleOwned, articleController.deleteArticle);
// router.post("/comment/:article_id/create", AuthMiddleware.isAuthenticated, articleController.createComment);
router.get("/:article_id", AuthMiddleware.isAuthenticated, articleController.getArticle)
router.get("/", AuthMiddleware.isAuthenticated, articleController.getArticleList);
export default router;
