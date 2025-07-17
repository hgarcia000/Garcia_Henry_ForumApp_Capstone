import express from "express"
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

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
        const query2 = await Post.find({postedBy: req.query.username}).select('-comments');

        res.status(200).json([...query, ...query2]);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// Edit comment.
commentRouter.put('/edit/:id', async (req, res) => {
    try {

        await Comment.findByIdAndUpdate(req.params.id, {
            body: req.body.body,
            editedAt: new Date()
        });

        const updatedComment = await Comment.findById(req.params.id);

        await Post.findOneAndUpdate(
            {_id: updatedComment.thread_id, 'comments._id': updatedComment._id},
            {$set: {'comments.$.body': updatedComment.body, 'comments.$.editedAt': updatedComment.editedAt}}
        );

        res.status(200).json(updatedComment);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Delete comment.
commentRouter.delete('/delete/:id', async (req, res) => {
    try {
        
        const commDelete = await Comment.findByIdAndDelete(req.params.id);

        await Post.findOneAndUpdate(
            {_id: commDelete.thread_id}, 
            {$pull: {comments: commDelete}}
        );

        res.status(200).json(commDelete);
    } catch (error) {
        
    }
});

export default commentRouter;