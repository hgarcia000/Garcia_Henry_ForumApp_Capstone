import mongoose from "mongoose";
import { commentSchema } from "./Comment";


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
    comments: [commentSchema]

});

export default mongoose.model('Post', postSchema, 'posts');