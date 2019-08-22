const mongoose = require('mongoose');
const users = require("./routes/users");
const tasks = require("./routes/tasks");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.get("/",(req,res) => res.send("hello peole"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const db = require("./config/keys").mongoURI;
// body parser before app.use(route) 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use("/users",users);
app.use("/tasks",tasks);

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));