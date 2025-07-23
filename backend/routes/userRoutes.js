import express from "express"
import User from "../models/User.js";

export const loggedUser = {
    id: null,
    value: null
};

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {

    try {
        if (req.query.username) {
            const user = await User.findOne({username: req.query.username}).select('-password -email');

            res.status(200).json(user);
        } else {
            const query = await User.find({}).select('-password -email');
        
            res.status(200).json(query);
        }

    } catch (error) {
        res.status(400).json({message: error.message});
    }

});

userRouter.get('/:id', async (req, res) => {

    try {
        const query = await User.findById(req.params.id).select('-password -email');
    
        if (!query._id) {
            throw new Error("User not found!");
        }

        res.status(200).json(query);

    } catch (error) {
        res.status(404).json({message: error.message});
    }

});

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
        }).select('-password');

        if (query) {

            // Condition to check if the user is banned.
            if (query.authorizationLevel === 0) {
                throw new Error("This user is banned!");
            }

            loggedUser.id = query.id;
            loggedUser.value = query.username;
            res.status(200).json(query);

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

// Edit your user information.
userRouter.put('/editInfo/:id', async (req, res) => {  
    try {

        const user = await User.findByIdAndUpdate(req.params.id,
            {
                title: req.body.title,
                location: req.body.location,
                about: req.body.about,
                img: req.body.img,
                signature: req.body.img
            }
        ).select('-password');

        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// Change passowrd
userRouter.patch('/changePassword/:id', async (req, res) => {  
    try {

        const user = await User.findByIdAndUpdate(req.params.id,{password: req.body.password});

        res.status(200).json({message: "Password changed successfully!"});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// Set authorization level
userRouter.patch('/authLevel/:id', async (req, res) => {  
    try {

        const user = await User.findByIdAndUpdate(req.params.id,{authorizationLevel: Number(req.body.authLevel)});

        res.status(200).json({id: user._id, username: user.username, authorizationLevel: user.authorizationLevel});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

export default userRouter;