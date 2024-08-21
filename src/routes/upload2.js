//개발부원 지원 관련
const express = require('express');
const router =express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {Dev_member} = require("../models");
const { isValidname, isValidstudentID, isValidphoneNumber, isValidemail, isValidgiturl, sendingerror, deletefile } = require('../utils/utils');

const portfolioDir = path.join(__dirname, '../../portfolio/');
try {
    fs.readdirSync(portfolioDir);
    console.log('portfolio directory ok');
} catch(error){
    fs.mkdirSync(portfolioDir);
    console.log('make portfolio directory');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) { //저장 위치
            done(null, portfolioDir); //portfolio 디렉토리에 저장
        },
        filename(req, file, done) {
            const timestamp = Date.now();
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, `${basename}-${timestamp}${ext}`); // 타임스탬프를 파일 이름에 추가
        }
    }),
})

const validators = {
    name: isValidname,
    student_id: isValidstudentID,
    phone_number: isValidphoneNumber,
    github_profile: isValidgiturl,
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
            const { name, student_id, major, phone_number, motivation, department, project_description,
                github_profile, github_email, slack_email, willing_general_member } = req.body;

            const ext = path.extname(req.file.originalname);
            const tmpFilename = req.file.filename;
            const tmpFilepath = path.join(portfolioDir, tmpFilename);


            // 값 누락 체크
            const requiredFields = {name, student_id, major, department, phone_number, motivation, willing_general_member };
            const requiredFields_dev = {project_description, github_profile, github_email, slack_email}
            for (const [field, value] of Object.entries(requiredFields)) {
                if (!value) {
                    deletefile(res, tmpFilepath);
                    return res.status(400).send(sendingerror(field, 1));
                }
            }
            if (department !== 'design'){
                for (const [field, value] of Object.entries(requiredFields_dev)) {
                    if (!value) {
                        deletefile(res, tmpFilepath);
                        return res.status(400).send(sendingerror(field, 1));
                    }
                }
            }

            // 값 형식 체크
            for (const [field, validator] of Object.entries(validators)) {
                const value = req.body[field];
                if (value !== '' && !validator(req.body[field])) {
                    deletefile(res, tmpFilepath);
                    return res.status(400).send(sendingerror(field, 2));
                }
            }

            // 중복 확인 by student_id
            const Check = await Dev_member.findOne({ where: { student_id } });
            if (Check) {
                deletefile(res, tmpFilepath);
                return res.status(409).send(`이미 신청하셨습니다`);
            }
            console.log('데이터 검사 완료');


            // 문제 없으면 pdf 이름 변경 후 저장
            const portfolioPdfFilename = `퀴푸-[${department}]${student_id}${name}` + ext;
            try {
                fs.renameSync(tmpFilepath, path.join(portfolioDir, portfolioPdfFilename));
                console.log(`파일 저장: ${portfolioPdfFilename}`);
            } catch(err){
                console.log(err);
                console.log(`파일 저장 실패: ${portfolioPdfFilename}`);
            }

            await Dev_member.create({
                name,
                student_id,
                major,
                phone_number,
                department,
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