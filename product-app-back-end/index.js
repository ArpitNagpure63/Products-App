const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const dashboardRouter = require('./routes/dashboard');

const app = express();
const port = 5000;

// access payload in req.body
app.use(bodyParser.json());
// cookie access in req.cookie
app.use(cookieParser());
// Allow origin
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// APIs
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/dashboard', dashboardRouter);

// DB Connection
mongoose.connect('mongodb://localhost:27017/UserDB').then(() => {
    console.log('DB connection sucess');
}).catch((error) => {
    console.log(`DB connection failed, Error: ${error}`);
});

// Server Connection
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});