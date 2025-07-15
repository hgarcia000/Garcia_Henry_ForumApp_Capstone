import mongoose from "mongoose";
import { commentSchema } from "./Comment.js";
import { loggedUser } from "../routes/userRoutes.js";


const postSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        default: loggedUser.value
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    editedAt : {
        type: Date
    },
    isLocked : {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]

});

export default mongoose.model('Post', postSchema, 'posts');