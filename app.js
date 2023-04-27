const express= require("express");
const cors= require("cors");
require("dotenv").config();
const users= require("./users");

const app= express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=> {
    res.send("App is running!");
})

app.post("/", (req, res)=> {
    const code= process.env.CODE;
    const user= users.filter(user=> user.username === req.body.username);

    if(user.length < 1){
        res.status(404).json({
            message: "User does not exist"
        })
        return;
    }
    else{
        if(user[0].userId != req.body.userId){
            res.status(404).json({
                message: "User does not exist"
            })
            return;   
        }
        else{
            res.status(200).json({
                message: "User authenticated",
                user: user[0],
                key: 1234
            })
        }
    }
})

app.listen(3000, ()=> {
    console.log("server running on PORT 3000");
})