const fs = require('fs');
//데이터 형식 평가
const Validname = /^[가-힣]+$/;
const Validphone_number = /^\d{11}$/;
//const Validphone_number = /^(\d{0,3})\s?(\d{0,4})\s?(\d{0,4})$/;
const Validstudent_ID = /^\d{10}$/;
const Validemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Validgiturl = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]{1,39}$/i;


function isValidname(name) {
    return Validname.test(name);
}
function isValidstudentID(student_id){
    return Validstudent_ID.test(student_id);
}
function isValidphoneNumber(phone_number) {
    return Validphone_number.test(phone_number);
}

function isValidemail(email) {
    return Validemail.test(email);
}
function isValidgiturl(url) {
    return Validgiturl.test(url);
}

function sendingerror(field, version){
    if(version === 1){
        switch(field){
            case 'name':
                return '이름이 누락되었습니다';
            case 'student_id':
                return '학번이 누락되었습니다';
            case 'phone_number':
                return '전화번호가 누락되었습니다';
            case 'department':
                return '지원 분야가 누락되었습니다';
            case 'motivation':
                return '지원동기가 누락되었습니다';
            case 'project_description':
                return '프로젝트 소개가 누락되었습니다';
            case 'github_profile':
                return 'Github 프로필 주소가 누락되었습니다';
            case 'github_email':
                return 'Github 이메일이 누락되었습니다'
            case 'slack_email':
                return 'Slack 이메일이 누락되었습니다';
        }
    }
    else if(version === 2){
        switch(field){
            case 'name':
                return '이름의 형식이 잘못되었습니다';
            case 'student_id':
                return '학번의 형식이 잘못되었습니다';
            case 'phone_number':
                return '전화번호의 형식이 잘못되었습니다';
            case 'github_profile':
                return 'Github 프로필 주소의 형식이 잘못되었습니다';
            case 'github_email':
                return 'Github 이메일의 형식이 잘못되었습니다'
            case 'slack_email':
                return 'Slack 이메일의 형식이 잘못되었습니다';
        }
    }
}

function deletefile(res, filePath,) {
    fs.unlink(filePath, (err) => {
        if (err) console.error('파일 삭제 실패:', err);
    });
}

module.exports = { isValidname, isValidstudentID, isValidphoneNumber, isValidemail, isValidgiturl, sendingerror, deletefile} ;