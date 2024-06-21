import model from '../models/article.js';
import responseMessages from '../utils/HttpMessage.js';

function getArticleList(req,res){
    const pageNo = req.query.pageNo ?? 1
    const articleList = model.getArticleList(pageNo);
    res.status(200).send(responseMessages.success(200,`${pageNo}페이지게시글목록조회성공`,articleList));
}

function getArticle(req,res){
    const articleNo = req.params.article_id;
    const article = model.getArticle(articleNo)
    if (article){
        res.status(200).send(responseMessages.success(200,`게시글${articleNo}번조회성공`,article))
    }
    else {
        res.status(404).send(responseMessages.failure(404,`게시글${articleNo}번존재하지않음`,null))
    }
}

function createArticle(req,res){
    const newArticle = {
        title: req.body.article_title,
        article_content: req.body.article_content,
        article_image : req.file.filename,
        authorId: req.body.uuid
    }
    model.createArticle(newArticle)
    res.status(201).send(responseMessages.success(201,"게시글생성성공",null));
}

function updateArticle(req,res){
    const articleId = req.params.article_id;
    const newArticle = {
        title: req.body.title,
        article_content: req.body.article_content,
        article_image : req.file.filename,
    }
    model.updateArticle(articleId,newArticle)
    res.status(200).send(responseMessages.success(200,"게시글수정성공",null));
}

function deleteArticle(req,res){
    const articleId = req.params.article_id;
    model.deleteArticle(articleId)
    res.status(204).send(responseMessages.success(204,"게시글삭제성공",null));

}

function getComments(req,res){
    const articleId = req.params.article_id;
    const comments = model.getComments(articleId)
    if (comments){
        res.status(200).send(responseMessages.success(200,`게시글${articleId}번댓글조회성공`,comments))
    }
    else {
        res.status(404).send(responseMessages.failure(404,`게시글${articleId}번댓글존재하지않음`,null))
    }
}

function createComment(req,res){
    const newComment = {
        article_id: req.params.article_id,
        authorId: req.body.authorId,
        content : req.body.content,
    }
    model.creatComment(newComment)
    res.status(201).send(responseMessages.success(201,"댓글생성성공",null));
}

function updateComment(req,res){
    const newComment = {
        comment_id: req.params.comment_id,
        content: req.body.content,
    }
    model.updateComment(newComment)
    res.status(200).send(responseMessages.success(200,"댓글수정성공",null));
}

function deleteComment(req,res) {
    const commentId = req.params.comment_id;
    model.deleteComment(commentId)
    res.status(204).send(responseMessages.success(204,"댓글삭제성공",null));
}

export default {
    getArticleList,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticle,
    getComments,
    createComment,
    updateComment,
    deleteComment
}