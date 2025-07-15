import mongoose from "mongoose";
import { loggedUser } from "../routes/userRoutes.js";


export const commentSchema = new mongoose.Schema({
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
    }
});

export default mongoose.model('Comment', commentSchema, 'comments');