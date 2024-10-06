const mongoose = require("mongoose");


const connectDb = async()=> {
    await mongoose.connect(
        
        "mongodb+srv://nitinpachnanda:WyeU278d6jHvUBBk@namastenode.vu6m0.mongodb.net/devTinder"
    )
}

module.exports = connectDb;



//mongodb+srv://nitinpachnanda:WyeU278d6jHvUBBk@namastenode.vu6m0.mongodb.net/?retryWrites=true&w=majority&appName=namasteNode
