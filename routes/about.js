const express = require('express');

const router = express.Router();

// GET /about 라우터
router.get('/', (req, res) => {
  res.send('about');
});

module.exports = router;