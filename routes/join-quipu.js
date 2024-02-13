const express = require('express');

const router = express.Router();

// GET /join 라우터
router.get('/', (req, res) => {
  res.send('join');
});

module.exports = router;