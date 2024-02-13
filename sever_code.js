const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const mysql = require("mysql");

console.log(path)

dotenv.config();
const homerouter = require('./routes/home');
// const aboutrouter = require('./routes/about');
// const activityrouter = require('./routes/activity');
// const recommendrouter = require('./routes/recommend-site');
// const joinrouter = require('./routes/join-quipu');

const app = express();
const port = process.env.PORT || 3000;

// MySQL
const connection = mysql.createConnection({
  host: 'mainquipu.ctkukqackfc1.ap-northeast-2.rds.amazonaws.com',
  user: 'quipu0220',
  password: 'q0u2i2p0u!*',
  database: 'quipu'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});


app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));


app.use('/', homerouter);
// app.use('/about', aboutrouter);
// app.use('/activity', activityrouter);
// app.use('/recommend-site', recommendrouter);
// app.use('/join-quipu', joinrouter);

app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM your_table', (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from MySQL database: ' + error.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});