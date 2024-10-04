const express = require("express");

const app = express();

// this will only handle get request call to user
app.get("/user", (req, res)=> {
    res.send({
        "name":"Akshay",
        "lastname":"kumar"
    });
   })

   app.post("/user", (req, res)=> {
    //sava data to db
    res.send("Data saved to database");
   })   

// this will match all api calls (default api)   
app.get("/", (req, res)=> {
    res.send("namaste express node");
   })   

app.listen(5000, ()=> {
    console.log("Server is running");
});