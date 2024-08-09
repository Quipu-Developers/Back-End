//일반부원 지원 관련
const express = require('express');
const router =express.Router();
const { General_member } = require('../models');
const { isValidname, isValidstudentID, isValidphoneNumber, sendingerror } = require('../utils/utils');

const validators = {
    name: isValidname,
    student_id: isValidstudentID,
    phone_number: isValidphoneNumber,
};

router.post('/', async (req, res) => {
    try {
        const { name, student_id, major, phone_number, motivation } = req.body;
        console.log('데이터 전송 완료');
        console.log(req.body);
        // 값 누락 체크
        const requiredValues = { name, student_id, major, phone_number, motivation };
        for (const [field, value] of Object.entries(requiredValues)) {
            if (!value) {
                return res.status(400).send(sendingerror(field, 1));
            }
        }
        // 값 형식 체크
        for ( const [field, validator] of Object.entries(validators)) {
            if (!validator(req.body[field])) {
                return res.status(400).send(sendingerror(field, 2));
            }
        }

        //중복 확인 by student_id
        const Check = await General_member.findOne({
            where: {student_id: student_id} });
        if (Check) {
            return res.status(409).send(`이미 신청하셨습니다`);
        }
        console.log('데이터 검사 완료');

        //문제 없으면 저장
        await General_member.create({
            name,
            student_id,
            major,
            phone_number,
            motivation,
        });
        res.status(201).send(`저장 완료`);
        console.log('데이터 저장 완료');

    }
     catch (err) {
        console.error(err);
        res.status(500).send(`서버 에러`);
    }
});

module.exports = router;