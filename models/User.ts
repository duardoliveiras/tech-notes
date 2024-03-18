import mongoose from "mongoose";

// Mongoose is a MongoDB object modeling tool.
export const userSchema = new mongoose.Schema({     
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: String,
        deafult: "Employee"
    }],

});