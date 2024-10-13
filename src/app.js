const express = require("express");
const connectDb = require("./config/database");
const User = require("./modal/user");
const { validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

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

// Sign up API
app.post("/signup", async (req, res) => {

  try {

    //Encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);


    validateSignUpData(req);
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      // If the email is already taken, send a response with a 409 status code (Conflict)
      return res.status(409).json({ message: "Email already in use" });
    }

    // Create a new user instance
    const user = new User({
      firstName, lastName, email, password:passwordHash
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error saving the user: " + err.message });
  }
});


// Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      // If the user is not found, send a response with a 404 status code (Not Found)
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const passwordValid = await bcrypt.compare(password, existingUser.password);

    if (passwordValid) {
      return res.status(200).json({ message: "Login Successfully!" });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

  } catch (err) {
    res.status(500).json({ message: "Error during login: " + err.message });
  }
});


//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if(user.length === 0) {
      res.send("user not found");
    }
    else {
    res.send(user);}
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Get feed - get all user data
app.get("/feed", async (req, res) => {
   const userEmail = req.body.emailId;
   try {
     const user = await User.find({  });
     res.send(user);
   } catch (err) {
     res.status(400).send("Something went wrong");
   }
 });

//Delete User
app.delete("/user", async (req, res) => {
   const userId = req.body.userId;
   try {
     const user = await User.findByIdAndDelete(userId);
     res.send("User Deleted");
   } catch (err) {
     res.status(400).send("Something went wrong");
   }
 }); 

 //Update User
app.patch("/user", async (req, res) => {
   const userId = req.body.userId;
   const data = req.body;
   try {
     const user = await User.findByIdAndUpdate({_id:userId}, data);
     res.send("User Updated");
   } catch (err) {
     res.status(400).send("Something went wrong");
   }
 }); 

connectDb()
  .then(() => {
    console.log("Database connection established");
    app.listen(5000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error("Database connection is not establisehd");
  });
