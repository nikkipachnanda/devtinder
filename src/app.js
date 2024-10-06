const express = require("express");
const connectDb = require("./config/database");
const User = require("./modal/user");

const app = express();

// this will match all api calls (default api)   
// app.get("/", (req, res, next)=> {
//    res.send("namaste express node");
//    next();
//    })   

// // this will only handle get request call to user
// app.get("/user", (req, res)=> {
//      res.send({
//         "name":"Akshay",
//         "lastname":"kumar"
//     });
//    })

//    app.post("/user", (req, res)=> {
//     //sava data to db
//     res.send("Data saved to database");
//    })   

app.post("/signup", async (req, res) => {
   const user = new User ({
      firstName:"Virat",
      lastName:"Kohli",
      emailId:"virat@gmail.com",
      password:"123",
   });
   //Creating a instance of user model
 //  const user = new User(userObj);
    
   // save function return the promise
   try {
   await user.save();
   res.send("User added successfully");
  } catch(err) {
   res.status(400).send("Error saving the user" + err.message);
  }
})

connectDb().then(()=> {
   console.log("Database connection established");
   app.listen(5000, ()=> {
      console.log("Server is running");
  });
}).catch((err)=> {
  console.error("Database connection is not establisehd");
})



