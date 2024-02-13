const express = require('express');

const router = express.Router();

// GET /activity 라우터
router.get('/', (req, res) => {
  res.send('activity');
});

module.exports = router;