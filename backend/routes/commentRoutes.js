import express from "express"
import Comment from "../models/Comment.js";

const commentRouter = express.Router();

// Find all comments.
commentRouter.get('/', async (req, res) => {
    try {
    
            const query = await Comment.find({});
    
            res.status(200).json(query);
            
        } catch (error) {
            res.status(400).json({message: error.message});
        }
});

// Find one comment by _id.
commentRouter.get('/:id', async (req, res) => {
    try {
        const query = await Comment.findById(req.params.id);

        if (!query._id) {
            throw new Error("Comment not found!");
        }

        res.status(200).json(query);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// Find all comments by a specific user.
commentRouter.get('/findBy', async (req, res) => {
    try {
        if (!req.query.username) {
            throw new Error("Please Enter a Username!");            
        }
        const query = await Comment.find({postedBy: req.query.username});

        res.status(200).json(query);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// Edit comment.
commentRouter.put('/edit/:id', async (req, res) => {
    
});

// Delete comment.
commentRouter.delete('/delete/:id', async (req, res) => {
    
});

export default commentRouter;