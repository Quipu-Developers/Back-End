//이벤트
const express = require('express');
const router = express.Router();
const { Event_goods, Event_participant} = require('../models');
const { isValidname, isValidstudentID, sendingerror } = require('../utils/utils');

const validators = {
    name: isValidname,
    student_id: isValidstudentID,
};

// GET /event/can_participation
router.get('/can_participation', async (req, res) => {
    try{
        const remain_goods = await Event_goods.findAll();
        // { name: '메가 커피', count: 60}
        let remain_goods_number = 0;
        remain_goods.forEach(item => {
            remain_goods_number += item.count;
        });
        if (remain_goods_number > 0){
            return res.status(200).json(remain_goods);
        }
        else {
            return res.status(403).send('이벤트 참여 불가');
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send('server error');
    }
})

// POST /event/participation
router.post('/participation', async(req, res) => {
    try{
        const {name, student_id} = req.body;
        console.log('데이터 전송 완료');
        console.log(req.body);
        // 값 누락 체크
        const requiredValues = { name, student_id };
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
        // 중복 확인 by student_id
        const Check = await Event_participant.findOne({
            where: {student_id: student_id} });
        if (Check) {
            return res.status(409).json(Check);
        }
        console.log('데이터 검사 완료');

        const remain_goods = await Event_goods.findAll();
        let remain_goods_number = 0;
        remain_goods.forEach(item => {
            remain_goods_number += item.count;
        });
        const allItems = [];
        remain_goods.forEach(item => {
            for (let i = 0; i < item.count; i++) {
                allItems.push(item.name);
                allItems.push('Boom');
            }
        })
        const randomIndex = Math.floor(Math.random() * allItems.length);
        const selectedItem = allItems[randomIndex];
        let winning = 0;
        if (selectedItem !== 'Boom'){
            winning = 1;
            const reduce_goods = await Event_goods.findOne({where: {name: selectedItem}})
            reduce_goods.count --;
            await reduce_goods.save();
        }
        const result = {
            name,
            student_id,
            winning,
            goods: selectedItem,
        }
        await Event_participant.create(result);
        res.status(201).json(result);
        console.log('이벤트 로직 성공');
    } catch(error){
        console.log(error);
        res.status(500).send('server error');
    }
})
router.post('/kakao_id', async (req, res) => {
    const { kakao_id, student_id } = req.body;
    try {
        const winner = await Event_participant.findOne({ where: { student_id } });
        console.log(winner);
        if (winner) {
            if(winner.winning === true){
                await winner.update({ kakao_id });
                res.status(200).send('당첨자 kakao_id 업데이트 성공');
            }
            else{
                res.status(400).send('당첨자가 아님');
            }
        } else {
            res.status(404).send('해당 student_id를 가진 참가자를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 오류');
    }
});

module.exports = router;