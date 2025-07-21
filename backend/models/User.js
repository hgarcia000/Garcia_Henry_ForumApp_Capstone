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
    // title: A short title you'd like to give to yourself.
    title:{
        type: String,
        default: "Member"
    },
    // authorizationLevel[ 0: Banned, 1: Member, 2: Moderator, 3: Admin]
    authorizationLevel:{
        type: Number,
        default: 1
    },
    // location: String indicating a user's country/city
    location: {
        type: String,
        required: false
    },
    // about: String indicating a summary about a user.
    about:{
        type: String,
        required: false
    },
    // img: String indicating an image src for a user's avatar.
    img: {
        type: String,
        required: false
    },
    // signature: string indicating a user's "signature" at the bottom of their posts.
    signature:{
        type: String,
        required: false
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema,'users');