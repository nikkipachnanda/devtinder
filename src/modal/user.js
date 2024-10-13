const mongoose = require('mongoose');
const joi = require("joi");

const userSchema = mongoose.Schema({
    firstName: { type:String},
    lastName: { type:String},
    email: { type:String, required:true, unique:true, lowercase:true, trim:true, minLength:4, match: /.+\@.+\..+/ },
    password: { type:String},
    age: { type:Number, min:18},
    // age: joi.number().integer().min(18).optional().messages({
    //     'number.min': 'Age must be at least 18',
    //   }),
    gender: { type:String},
    photoUrl: { type:String, default:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1728576287~exp=1728576887~hmac=f12fd42c241e54b4fd6264e306d595bdd10738328f73cef62fc7bc9578319845"},
    about: { type:String, default:"This is about default name"},
    skills: { type:[String]}
})


module.exports = mongoose.model("User", userSchema); 
