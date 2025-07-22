import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.js";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASEURL + '/api/users/signup';

function Signup() {

    const {currentUser, setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: '',
        about: ''
    });

    const [msg, setMsg] = useState({
        text: '',
        color: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setFormData({
            ...formData,
            [name]: value.replace(" ", "_")
        });
        } else {
            setFormData({
            ...formData,
            [name]: value
        });
        }
        
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (formData.password !== formData.confirmPassword) {
                throw new Error("Passwords must match!");
            }
            const result = await axios.post(URL, formData);
            const { _id, username } = result.data;
            setCurrentUser({ _id, username });
            setMsg({
                text: 'Successfully signed up as: ' + username,
                color: 'success'
            });
            setTimeout(() => { navigate('/'); }, 1750);
        } catch (error) {
            console.log('ERROR:', error.message);
            setMsg({
                text: error.message,
                color: 'error'
            });
        }
    }



    return (
        <>
            <NavBar />
            <h1>Sign Up to Be a Member!</h1>
            <Box sx={{ border: '2px solid #111', borderRadius: '15px', bgcolor: '#ccc' }}>
                <form onChange={handleChange} onSubmit={handleSubmit} >
                    <TextField name="username" id="username" label="Username" variant="outlined" margin="normal" required /> <br />
                    <TextField name="email" id="email" label="Email" variant="outlined" margin="normal" required /> <br />
                    <TextField type="password" name="password" id="password" label="Password" variant="outlined" margin="normal" required /> <br />
                    <TextField type="password" name="confirmPassword" id="confirmPassword" label="Confirm Password" variant="outlined" margin="normal" required /> <br />
                    <TextField name="location" id="location" label="Location" variant="outlined" margin="normal" /> <br />
                    <TextField sx={{ width: '98%' }} name="about" id="about" label="About" variant="outlined" margin="normal" /> <br />
                    <Button disabled={formData.password?.length < 8} variant="contained" type="submit" sx={{ marginBottom: '1rem' }}>Sign Up</Button>
                </form>
                <Typography color={msg?.color}><i>{msg?.text}</i></Typography>
            </Box>
        </>
    )
}

export default Signup;