const app = require("express");
const http=require('http').Server(app);

const mongoose=require('mongoose');
const Users = require('./models/User');
mongoose.connect("mongodb://localhost:27017/shoplify")

const User=require('./models/userModel')

async function insert(){
    User.create({
        name: 'Chirag',
        email: 'chiragmahajan26.cm@gmail.com'
    });
}
insert();

http.listen(3000, function(){
    console.log('Server is running');
});



