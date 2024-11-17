
const mongoose = require('mongoose');


  //schema
  const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    }
},{timestamps :true}   );

const Todo=mongoose.model('todo', todoSchema);

module.exports=Todo;