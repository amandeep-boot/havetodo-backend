const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

const app = express();

app.use(express.json());
app.post("/todos", async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if (!parsePayload.success) {
        return res.status(411).json({ msg: "invalid input" });
    }
    //put it in mongodb
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    })

    return res.json({msg : "Todo created"})
});
app.get("/todos", async (req, res) => {
    const todos=await todo.find({});
    res.json({
        todos
    });
});

app.put("/completed", async (req, res) => {
    const updatePayload=req.body;
    const parsePayload=updateTodo.safeParse(updatePayload);

    if(!parsePayload.success){
        return res.status(411).json({msg:"something is up with inputs"});
    }

    // update in db
    //update takes to arguments first is conditions to filter out objects , second is changes made on those objects
    await todo.updateOne({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({msg:"Todo updated as completed"})
});


app.listen(3000,()=>{
    console.log("listening on port 3000");
})