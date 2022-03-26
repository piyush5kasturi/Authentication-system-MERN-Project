const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());
//we link the router files to make our route easy
app.use(require('./router/auth'))


//DATABASE


const PORT = process.env.PORT;



// Middelware

// const middleware = (req, res, next) => {
//     console.log('Hello middleware');
//     next()
// }

// middleware();



// app.get('/', (req, res) => {
//     res.send('Hello World from the server');
// });

// app.get('/about', (req, res) => {
//     res.send('Hello World from the server ABOUT PAGE');
// });

app.get('/contact', (req, res) => {
    res.send('Hello World from the server CONTACT PAGE');
});

app.get('/signin', (req, res) => {
    res.send('Hello World from the server SIGNIN');
});

app.get('/signup', (req, res) => {
    res.send('Hello World from the server SIGNUP');
});

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})