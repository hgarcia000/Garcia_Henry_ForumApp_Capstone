import express from "express"
import User from "../models/User.js";

export const loggedUser = {
    id: null,
    value: null
};

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

            loggedUser.id = query.id;
            loggedUser.value = query.username;
            res.status(200).json(`Logged in as ${loggedUser.value}!`);

        } else {

            throw new Error("Incorrect Email or Password!");

        }
    } catch (error) {

        res.status(401).json({message: error.message});
        
    }
});

userRouter.post('/logout', async (req, res) => {
    
    if (loggedUser.value) {

        loggedUser.id = null, loggedUser.value = null;
        res.status(200).json({message: "Logout Successful!"});

    } else {

        res.status(401).json({message: "You're not logged in..."});
        
    }

});

export default userRouter;