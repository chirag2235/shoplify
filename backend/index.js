const express = require("express");
const app = express();
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/shoplify")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware for error
const errorMiddleware = require("./middleware/error");


//Routes
const products = require('./routes/productRoute');
const user= require('./routes/userRoute');
app.use('/api/v1', products);
app.use('/api/v1',user);

app.use(errorMiddleware);


const PORT =3000;
http.listen(PORT, function(){
    console.log('Server is running');
});
