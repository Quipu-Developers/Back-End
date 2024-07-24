//개발부원 지원 관련
const express = require('express');
const router =express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {Dev_member} = require("../models");
const { isValidname, isValidstudentID, isValidphoneNumber, isValidemail, isValidurl, sendingerror } = require('../utils/utils');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) { //저장 위치
            done(null, 'test/'); //test 디렉토리에 저장
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); //파일의 확장자
            const name = req.body.name;
            const student_id = req.body.student_id;
            const filename = `퀴푸-${name}${student_id}` + ext;
            file.savedFilename = filename;
            done(null, filename); //파일 이름, '퀴푸-이름학번.pdf'
        }
    }),
})

const validators = {
    name: isValidname,
    student_id: isValidstudentID,
    phone_number: isValidphoneNumber,
    github_profile: isValidurl,
    github_email: isValidemail,
    slack_email: isValidemail,
};


router.post('/', async (req, res) => {
    upload.single('portfolio_pdf')(req, res, async function (err) {
        try {
            if (!req.file) {
                return res.status(400).send('pdf가 누락되었습니다');
            }
            console.log('데이터 전송 완료');
            console.log(req.body);
            const { name, student_id, major, phone_number, motivation, project_description,
                github_profile, github_email, slack_email, willing_general_member } = req.body;

            // 값 누락 체크
            const requiredFields = { name, student_id, major, phone_number, motivation, project_description,
                github_profile, github_email, slack_email, willing_general_member };
            for (const [field, value] of Object.entries(requiredFields)) {
                if (!value) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error('파일 삭제 실패:', err);
                    });
                    return res.status(400).send(sendingerror(field, 1));
                }
            }
            // 값 형식 체크
            for (const [field, validator] of Object.entries(validators)) {
                if (!validator(req.body[field])) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error('파일 삭제 실패:', err);
                    });
                    if(field === 'student_id'){
                        return res.status(400).send(sendingerror(field, 2));
                    }
                }
            }
            // 중복 확인 by student_id
            const Check = await Dev_member.findOne({ where: { student_id } });
            if (Check) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('파일 삭제 실패:', err);
                });
                return res.status(409).send(`이미 신청하셨습니다`);
            }
            console.log('데이터 검사 완료');

            // 문제 없으면 저장
            const portfolioPdfFilename = req.file.savedFilename;
            await Dev_member.create({
                name,
                student_id,
                major,
                phone_number,
                motivation,
                project_description,
                portfolio_pdf: portfolioPdfFilename,
                github_profile,
                github_email,
                slack_email,
                willing_general_member,
            });
            res.status(201).send(`저장 완료`);
            console.log('데이터 저장 완료');
        } catch (err) {
            console.error(err);
            res.status(500).send(`서버 에러`);
        }
    });
});
module.exports = router;