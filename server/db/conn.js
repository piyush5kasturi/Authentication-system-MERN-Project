const mongoose = require('mongoose');

//DATABASE
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log('no connection')
});
