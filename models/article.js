import fs from 'fs';
import path from 'path';

const __dirname = path.resolve()

// return
function getArticleList(pageNo){
    const articleListData = JSON.parse(fs.readFileSync(__dirname + '/models/articles.json', 'utf8'));
    const articlesPerPage = 10

    const filteredArticles = articleListData.filter(article => article.active !== false);

    const startIdx = (pageNo - 1) * articlesPerPage
    const endIdx = startIdx + articlesPerPage

    return filteredArticles.slice(startIdx, endIdx);
}

function getArticle(articleNo){
    const articleListData = JSON.parse(fs.readFileSync(__dirname + '/models/articles.json', 'utf8'));

    for (let article of articleListData) {
        if (parseInt(article.article_id) === parseInt(articleNo)) {
            return article
        }
    }
    return null
}

// create
function createArticle(newArticle){
    const articleListData = JSON.parse(fs.readFileSync(__dirname + '/models/articles.json', 'utf8'));
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));
    let author_nickname = "";
    let author_profile = "";

    memberData.forEach(member => {
        if (member.uuid === newArticle.authorId) {
            author_nickname = member.nickname;
            author_profile = member.profileImg;
        }
    })
    const article = {
        article_id: articleListData.length + 1,
        active : true,
        title: newArticle.title,
        comments: 0,
        like: 0,
        view: 0,
        created_at: new Date().toISOString(),
        article_content: newArticle.article_content,
        author: author_nickname,
        author_id: newArticle.authorId,
        author_profile : author_profile,
        article_image: newArticle?.article_image ?? ""
    }

    articleListData.push(article);

    fs.writeFileSync(__dirname + '/models/articles.json', JSON.stringify(articleListData, null, 2));

}

function updateArticle(articleId,newArticle){
    const articleListData = JSON.parse(fs.readFileSync(__dirname + '/models/articles.json', 'utf8'));
    let target_index;
    articleListData.forEach((article, index) => {
        if (parseInt(article.article_id) === parseInt(article_id)) {
            target_index = articleId;
        }
    })
    articleListData[target_index]["title"] = newArticle.title
    articleListData[target_index]["article_content"] = newArticle.article_content
    articleListData[target_index]["article_image"] = newArticle?.article_image ?? ""

    fs.writeFileSync(__dirname + '/models/articles.json', JSON.stringify(articleListData, null, 2));

}

function deleteArticle(article_id){
    const articleListData = JSON.parse(fs.readFileSync(__dirname + '/models/articles.json', 'utf8'));
    let target_index = null;
    articleListData.forEach((article, index) => {
        if (parseInt(article.article_id) === parseInt(article_id)) {
            target_index = index;
        }
    })
    if (target_index !== null){
        for (let key in articleListData[target_index]) {
            if (key === "active"){
                articleListData[target_index][key] = false;
            }
            else if(key !== "article_id"){
                articleListData[target_index][key] = "";
            }
        }
        fs.writeFileSync(__dirname + '/models/articles.json', JSON.stringify(articleListData, null, 2));
    }
}

function getComments(article_id){
    const commentListData = JSON.parse(fs.readFileSync(__dirname + '/models/comments.json', 'utf8'));
    return commentListData.filter(comment => parseInt(comment.article_id) === parseInt(article_id))
}
function getComment(comment_id){
    const commentListData = JSON.parse(fs.readFileSync(__dirname + '/models/comments.json', 'utf8'));
    for (let comment of commentListData) {
        if (parseInt(comment.comment_id) === parseInt(comment_id)) {
            return comment
        }
    }
    return null
}

function creatComment(newComment){
    const commentListData = JSON.parse(fs.readFileSync(__dirname + '/models/comments.json', 'utf8'));
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));
    let commentor_nickname = "";
    let commentor_profile = "";
    memberData.forEach(member => {
        if (member.uuid === newComment.authorId) {
            commentor_nickname = member.nickname;
            commentor_profile = member.profileImg;
        }
    })

    const comment = {
        comment_id : commentListData.length + 1,
        article_id: parseInt(newComment.article_id),
        active : true,
        commenterName : commentor_nickname,
        commenter_id: newComment.authorId,
        commenter_profile_image : commentor_profile,
        content : newComment.content,
        created_at: new Date().toISOString(),
    }
    commentListData.push(comment);

    fs.writeFileSync(__dirname + '/models/comments.json', JSON.stringify(commentListData, null, 2));

}

function updateComment(newComment){
    const commentListData = JSON.parse(fs.readFileSync(__dirname + '/models/comments.json', 'utf8'));
    let target_index = null;
    commentListData.forEach((comment, index) => {
        if (parseInt(comment.comment_id) === parseInt(newComment.comment_id)) {
            target_index = index;
        }
    })
    if (target_index !== null){
        commentListData[target_index]["content"] = newComment.content
        fs.writeFileSync(__dirname + '/models/comments.json', JSON.stringify(commentListData, null, 2));
    }
}

function deleteComment(comment_id) {
    const commentListData = JSON.parse(fs.readFileSync(__dirname + '/models/comments.json', 'utf8'));
    let target_index = null;
    commentListData.forEach((comment, index) => {
        if (parseInt(comment.comment_id) === parseInt(comment_id)) {
            target_index = index;
        }
    })
    if (target_index !== null){
        for (let key in commentListData[target_index]) {
            if (key === "active"){
                commentListData[target_index][key] = false;
            }
            else if(key !== "comment_id" || key !== "article_id"){
                commentListData[target_index][key] = "";
            }
        }
        fs.writeFileSync(__dirname + '/models/comments.json', JSON.stringify(commentListData, null, 2));
    }
}

export default {
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleList,
    getArticle,
    getComments,
    getComment,
    creatComment,
    updateComment,
    deleteComment,
}