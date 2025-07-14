import express from "express"
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const userDoc = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location,
            about: req.body.about
        });

        const result = await userDoc.save();
        res.status(201).json({_id: result._id, username: result.username, email: result.email});

    } catch (error) {

        res.status(400).json({message: error.message});

    }
});

userRouter.post('/login', async (req, res) => {
    try {
        
        const query = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (query) {

            res.status(200).json(`Logged in as ${query.username}!`);

        } else {

            throw new Error("Incorrect Email or Password!");

        }
    } catch (error) {

        res.status(401).json({message: error.message});
        
    }
});

export default userRouter;