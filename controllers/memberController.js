import model from '../models/members.js';
import responseMessages from '../utils/HttpMessage.js';

function validateMember(req, res) {
    const uuid = model.validateLogin(req.body.email, req.body.password);
    // !!uuid ===  uuid ? true : false, it changes any type to boolean
    const result = !!uuid
    const validateMemberResponse = {
        result,
    }
    if (result){
        req.session.user = {
            uuid,
            authorized : true,
        }
        res.status(200).send(responseMessages.success(200,"로그인요청성공",validateMemberResponse));
    }
    else {
        res.status(401).send(responseMessages.failure(401,"잘못된계정정보",validateMemberResponse));
    }
}

function validateDuplicateEmail(req, res) {
    const isDuplicate = model.validateDuplicateEmail(req.query.email);

    const validateDuplicateEmailResponse = {
        result : isDuplicate
    }
    if (isDuplicate){
        res.status(409).send(responseMessages.failure(409,"중복된이메일",validateDuplicateEmailResponse));
    }
    else{
        res.status(200).send(responseMessages.success(200,"이메일중복조회성공",validateDuplicateEmailResponse));
    }
}
function validateDuplicateNickname(req, res) {
    const isDuplicate = model.validateDuplicateNickname(req.query.nickname);

    const validateDuplicateNicknameResponse = {
        result : isDuplicate
    }
    if (isDuplicate){
        res.status(409).send(responseMessages.failure(409,"중복된닉네임",validateDuplicateNicknameResponse));
    }
    else {
        res.status(200).send(responseMessages.success(200,"닉네임중복조회성공",validateDuplicateNicknameResponse));
    }

}

function createMember(req, res) {
    const newMember = {
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
        profileImg: req.file.filename,
    }
    model.creatMember(newMember);
    res.status(200).send(responseMessages.success(201,"회원가입요청성공",null));
}

function getMember(req, res){
    const member = model.getMember(req.params.userid);
    res.status(200).send(responseMessages.success(200,"회원정보요청성공",member));
}

function updateMember(req,res) {
    const newMember = {
        uuid: req.body.uuid,
        nickname: req.body.nickname,
        profileImg: req.body.profileImg,
    }
    model.updateMember(newMember)
    res.status(200).send(responseMessages.success(200,"회원정보수정성공",null))
}

function updatePassword(req,res){
    const newMember = {
        uuid: req.body.uuid,
        password: req.body.password,
    }
    model.updateMemberPassword(newMember)
    res.status(200).send(responseMessages.success(200,"비밀번호변경성공",null))
}

function deleteMember(req,res){
    const uuid = req.body.uuid;
    if (uuid){
        model.deleteMember(uuid)
        res.status(204).send(responseMessages.success(204,"회원삭제성공",null))
    }
    else {
        res.status(400).send(responseMessages.failure(400,"회원삭제실패",null))
    }
}

export default {
    validateMember,
    validateDuplicateEmail,
    validateDuplicateNickname,
    createMember,
    getMember,
    updateMember,
    updatePassword,
    deleteMember
}