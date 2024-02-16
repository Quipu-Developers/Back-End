const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const mysql = require("mysql");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// const cors = require("cors");
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// MySQL
// const connection = mysql.createConnection({
//     host: 'mainquipu.ctkukqackfc1.ap-northeast-2.rds.amazonaws.com',
//     user: 'quipu0220',
//     password: 'q0u2i2p0u!*',
//     database: 'quipu'
//   });
  
//   connection.connect(err => {
//     if (err) {
//       console.error('Error connecting to MySQL database: ' + err.stack);
//       return;
//     }
//     console.log('Connected to MySQL database as id ' + connection.threadId);
//   });

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

const http = require('http').createServer(app);

app.use( express.static( path.join(__dirname, '../front-end-main/public') ) );

app.get('*', function(request, response){
    response.sendFile( path.join(__dirname, '../front-end-main/public/index.html') )
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