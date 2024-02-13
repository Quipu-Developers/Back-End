const express = require('express');
const path = require('path');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'front-end-main', 'public', 'index.html'));
});

module.exports = router;