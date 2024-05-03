const express = require("express");
const app = express();
const http = require('http').Server(app);

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/shoplify")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// const User = require('./models/userModel');

// async function insert() {
//     await User.create({
//         name: 'Chirag',
//         email: 'chiragmahajan26.cm@gmail.com'
//     });
// }
// insert();

app.use(express.json());


//Middleware for error
const errorMiddleware=require("./middleware/error");
app.use(errorMiddleware);

//Routes
const products = require('./routes/productRoute');
app.use('/api/v1', products);


const PORT =3000;
http.listen(PORT, function(){
    console.log('Server is running');
});



