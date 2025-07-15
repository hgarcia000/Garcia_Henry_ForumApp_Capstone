import express from "express"
import Post from "../models/Post.js";
import { loggedUser } from "./userRoutes.js";
import Comment from "../models/Comment.js";

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
    try {

        const query = await Post.find({});

        res.status(200).json(query);
        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

postRouter.get('/:id', async (req, res) => {
    try {
        const query = await Post.findById(req.params.id);

        if (!query._id) {
            throw new Error("Thread not found!");
        }

        res.status(200).json(query);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

postRouter.post('/createThread', async (req, res) => {
    try {
        const postDoc = new Post({
            category: req.body.category,
            title: req.body.title,
            body: req.body.body,
            postedBy: loggedUser.value? loggedUser.value : req.body.postedBy
        });

        if (!postDoc.postedBy) {

            throw new Error("You're not logged in!");
            
        }

        const result = await postDoc.save();

        res.status(201).json(result);

    } catch (error) {
        res.status(403).json({message: error.message});
    }
});

postRouter.patch('/editThread/:id', async (req, res) => {
    try {

        const query = await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            editedAt: new Date()
        });

        res.status(200).json(query);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

postRouter.patch('/lockUnlockThread/:id', async (req, res) => {
    try {

        const thread = await Post.findById(req.params.id);
        const query = await Post.findByIdAndUpdate(req.params.id, {
            isLocked: !thread.isLocked
        });

        res.status(200).json(query);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

postRouter.post('/addComment/:id', async (req, res) => {
    try {
        const commentDoc = new Comment({
            thread_id: req.params.id,
            body: req.body.body,
            postedBy: loggedUser.value? loggedUser.value : req.body.postedBy
        });

        const result = await commentDoc.save();

        const thread = await Post.findByIdAndUpdate(req.params.id, {$push: {comments: result}});

        res.status(201).json(thread);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

export default postRouter;