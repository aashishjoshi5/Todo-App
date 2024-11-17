const router=require('express').Router();
const Todo= require('../models/todo');
//
router.get('/', async(req, res)=>{
    const allTodo = await Todo.find();
    // console.log(allTodo);
    
    res.render('index' ,{task: allTodo})
})




module.exports=router;