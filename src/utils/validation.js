const validator = require("validator");
const bcrypt = require("bcrypt");

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("All fields are required");
    }

    if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("First name should be 4-50 characters.");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

module.exports = {
    validateSignUpData
 }
