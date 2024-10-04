const express = require("express");

const app = express();

app.use("/test",(req, res)=> {
    res.send("Hello namaste from server");
})

app.use("/hi",(req, res)=> {
    res.send("Hi from server"); 
}) 


app.listen(5000, ()=> {
    console.log("Server is running");
});