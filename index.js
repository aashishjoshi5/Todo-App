const express = require("express");
const mongoose = require("mongoose");
const Todo=require('./models/todo');
// const router=require('./routes/index')
const path=require('path');



const PORT = 3000;
const app = express();

//connect mongodb database to nodejs
mongoose
  .connect("mongodb://127.0.0.1:27017/todo")
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB error :", error);
  });


  //middlewares
  app.use(express.json());
  app.use(express.urlencoded({extended:false}));
  app.set("view engine","ejs");
  app.set("views", path.resolve('./views'));

  

//routes
app.use(require('./routes/index'));
app.use(require('./routes/todo'));
//add task/todos





app.listen(PORT, () => {
  console.log(`Server is listening at PORT: ${PORT}`);
});
