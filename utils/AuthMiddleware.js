import responseMessages from "./HttpMessage.js";
import article from "../models/article.js";

function authMiddleware(req, res, next) {
    if (req.session.user && req.session.user.authorized) {
        return next();
    } else {
        res.status(401).send(responseMessages.failure(401, "인증되지 않은 사용자입니다"));
    }
}

const authorizeBoardMiddleware = async (req, res, next) => {
    const article_id = req.params.article_id;
    const board = await article.findArticleById(article_id);
    if (board.uuid === req.session.user.uuid) {
        next();
    } else {
        res.status(403).send(responseMessages.failure(403, "권한이 없는 사용자입니다"));
    }
}

const authorizeCommentMiddleware = async (req, res, next) => {
    const comment_id = req.params.comment_id;
    const comment = await article.findCommentsByCommentId(comment_id);
    console.log(req.session.user);
    if (comment.uuid === req.session.user.uuid) {
        next();
    }else {
        res.status(403).send(responseMessages.failure(403, "권한이 없는 사용자입니다"));
    }
}

export default {
    isAuthenticated: authMiddleware,
    authorizeBoardMiddleware,
    authorizeCommentMiddleware
}