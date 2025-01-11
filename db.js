const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://aman509deep:5dLxqkKUzzgxLJeL@havetodo.jiplc.mongodb.net/todos", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection error:", err));

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo: todo
};