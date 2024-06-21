import fs from 'fs';
import path from 'path';
import {v4} from 'uuid';

const __dirname = path.resolve()
// 로그인시 아이디와 비밀번호가 일치하는지 검증하는 함수
function validateLogin(email, password) {
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));
    for (let member of memberData) {
        if(member.email === email && member.password === password) {
            return member.uuid;
        }
    }

    return false;

}

// 회원가입시 이메일의 중복여부를 검증하는 함수
function validateDuplicateEmail(email) {
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));

    for (let member of memberData) {
        if (member.email === email ) {
            return true;
        }
    }
    return false;
}

// 회원가입시 닉네임의 중복여부를 검증하는 함수
function validateDuplicateNickname(nickname) {
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));

    for (let member of memberData) {
        if (member.nickname === nickname) {
            return true;
        }
    }
    return false;
}
// 회원가입한 정보를 db에 저장
function creatMember(newMember){
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));
    const uuid = v4();
    const member = {
        uuid,
        email: newMember.email,
        password: newMember.password,
        nickname: newMember.nickname,
        profileImg: newMember.profileImg,
    }

    memberData.push(member);

    fs.writeFileSync(__dirname + '/models/members.json', JSON.stringify(memberData, null, 2));

}

// 멤버 정보를 반환
function getMember(uuid) {
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));
    for (let member of memberData) {
        if (member.uuid === uuid) {
            return {
                email: member.email,
                nickname: member.nickname,
                profileImg: member.profileImg,
            };
        }
    }
}

// 멤버 정보를 업데이트
function updateMember(member) {
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));
    for (let i = 0; i < memberData.length; i++) {
        if (memberData[i].uuid === member.uuid) {
            memberData[i].nickname = member.nickname;
            memberData[i].profileImg = member.profileImg;
        }
    }
    fs.writeFileSync(__dirname + '/models/members.json', JSON.stringify(memberData, null, 2));
}

// 비밀번호 업데이트
function updateMemberPassword(member){
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));
    for (let i = 0; i < memberData.length; i++) {
        if (memberData[i].uuid === member.uuid) {
            memberData[i].password = member.password;
        }
    }
    fs.writeFileSync(__dirname + '/models/members.json', JSON.stringify(memberData, null, 2));
}

function deleteMember(uuid){
    const memberData = JSON.parse(fs.readFileSync(__dirname + '/models/members.json', 'utf8'));
    const deletedData = memberData.filter(member => member.uuid && member.uuid!==  uuid);
    fs.writeFileSync(__dirname + '/models/members.json', JSON.stringify(deletedData, null, 2));
}


export default {
    validateLogin,
    validateDuplicateEmail,
    validateDuplicateNickname,
    creatMember,
    getMember,
    updateMember,
    updateMemberPassword,
    deleteMember
}