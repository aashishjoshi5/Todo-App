
const router=require('express').Router();
const Todo  =require('../models/todo');



//routes
//get individual todos
router.get("/todo/:_id", async(req, res)=>{
  try {
    const {_id}=req.params;
    const todo =await Todo.findById(_id);

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({message: "todo not found!"});
  }
})

//get all todos
router.get("/alltodos", async(req,res)=>{
    try {
        const alltodos=await Todo.find({});
        res.status(200).json(alltodos);
    } catch (error) {
        res.status(500).json({message:"no todos found!"})
    }
})

//add individual todo
router.post("/add/todo", (req, res)=>{
     const {todo}=req.body;
     console.log(todo);
     const newTodo= new Todo({
        task :todo
     })

     newTodo.save().then(()=>{
        console.log("Successfully Added todo!");
        res.status(200).json({message: "Added individual todo successfully!"});
        // res.redirect("/");
     }).catch((error)=>{
        console.log(error);
        res.status(500).json({message:"error adding todo !"})
        
     })
     
})

//add multiple todos

router.post("/add/multiple/todos", async(req, res)=>{
    try {
        console.log(req.body.todos);
    const {todos}= req.body;
    const todoArray = Array.isArray(todos) ? todos : [todos];
    const todoDocs = todoArray.map(task => ({
        task,
    }));
    await Todo.insertMany(todoDocs);
    res.status(200).json({ message: "Todos added successfully" });
    // res.redirect("/");
    } catch (error) {
        console.log("error in adding multiple todos :", error);
        res.status(500).json({ error: "Failed to add todos" });
    }
    
    
})

//delete individual todo-- for frontend working use get method as html forms only support get/post method
//delete method  is also working when dealing with postman
router.delete("/delete/todo/:_id",(req, res)=>{
    const _id=req.params._id;
    console.log(_id);
    
    Todo.findByIdAndDelete({_id}).then(()=>{
        console.log("Deleted Todo successfully!");
        // res.redirect("/");
        res.status(200).json({message:"individual todo deleted successfully!"})
    }).catch((error)=>{
        res.status(500).json({message:"error in deleting individual todos!"})
        console.log(error);
        
    })
})

//bulk delete
router.delete("/delete/multiple/todos", async(req, res) => {
    try {
        console.log(req.body);
        
        const selectedIds = Object.keys(req.body).filter(id => req.body[id] === 'true');
        console.log(selectedIds);
         
        if(selectedIds.length >0){
            await Todo.deleteMany({ _id: { $in: selectedIds } });
        }
        res.status(200).json({ message: 'Selected todos deleted successfully' });

        // res.redirect('/');
    } catch (error) {
        res.status(500).json({message: "failed in deleting multiple todos!"});
        console.log('Error deleting multiple tasks :', error);
        
    }
});

//update individual todo
//put is also working when dealing with postman 
router.put("/update/todo/:_id", (req,res)=>{
    const _id=req.params._id;
    const {updatedTask}=req.body;
    // console.log(_id, updatedTask);
    

    Todo.findOneAndUpdate({_id}, {task:updatedTask}).then((updatedTodo)=>{
        if(updatedTodo){
            console.log('Todo updated successfully!');
            res.status(200).json({message:"updated individual todos successfully!"})
            // res.redirect('/');
            
        }
    }).catch((error)=>{
        console.log("updating error",error);
        
    })
})


// Bulk Update Todos
router.put("/update/multiple/todos", async(req, res)=>{
      try {
        const { selectedTodos, ...updatedTasks } = req.body;
        // console.log('multiple update body: ', req.body);
        const idsToUpdate = Array.isArray(selectedTodos) ? selectedTodos : [selectedTodos];
        for (const id of idsToUpdate) {
            if (updatedTasks[id]) {
             
              await Todo.findByIdAndUpdate(id, { task: updatedTasks[id] });
            }
          }
        res.status(200).json({message:"multiple todos updated successfully!"});
        //   res.redirect("/");
        
      } catch (error) {
        res.status(500).json({message:"error in updating multiple todos!"});
        console.log('Error in updating multiple tasks :', error);
        
      }

})





module.exports=router;