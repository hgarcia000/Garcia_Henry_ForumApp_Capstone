import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: 1
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Password: Consider using bcrypt to encrypt the password
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    title:{
        type: String,
        default: "Member"
    },
    // authorizationLevel[ 0: Banned, 1: Member, 2: Moderator, 3: Admin]
    authorizationLevel:{
        type: Number,
        default: 1
    },
    location: {
        type: String,
        required: false
    },
    about:{
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    signature:{
        type: String,
        required: false
    },
    jointedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema,'users');