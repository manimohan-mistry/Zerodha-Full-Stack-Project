const  { Schema } = require("mongoose");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

// UserSchema.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 10);
// });

module.exports = UserSchema;
