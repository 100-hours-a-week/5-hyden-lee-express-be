import responseMessages from "./HttpMessage.js";
import article from "../models/article.js";

function authMiddleware(req, res, next) {
    if (req.session.user && req.session.user.authorized) {
        return next();
    } else {
        res.status(401).send(responseMessages.failure(401, "인증되지 않은 사용자입니다"));
    }
}

const authorizeArticleMiddleware = async (req, res, next) => {
    const article_id = req.params.article_id;
    const {author_id} = await article.getArticle(article_id);
    if (author_id === req.session.user.uuid) {
        next();
    } else {
        res.status(403).send(responseMessages.failure(403, "권한이 없는 사용자입니다"));
    }
}

const authorizeCommentMiddleware = async (req, res, next) => {
    const comment_id = req.params.comment_id;
    const {commenter_id} = await article.getComments(comment_id);
    console.log(req.session.user);
    if (commenter_id === req.session.user.uuid) {
        next();
    }else {
        res.status(403).send(responseMessages.failure(403, "권한이 없는 사용자입니다"));
    }
}

export default {
    isAuthenticated: authMiddleware,
    isArticleOwned :authorizeArticleMiddleware,
    isCommentOwned : authorizeCommentMiddleware
}