import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { UserContext } from "../UserContext.js";
import { Link, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASEURL;

function Login() {

    const { setCurrentUser } = useContext(UserContext)
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();

            const form = {
                email: e.target.email.value,
                password: e.target.password.value,
            };

            const result = await axios.post(`${URL}/api/users/login`, form);
            const { _id, username } = result.data;
            setCurrentUser({ _id, username });
            navigate('/');

        } catch (error) {
            console.log('ERROR:', error.message);
            setMsg("Incorrect Email or Password!");
        }

    }

    return (
        <>
            <NavBar />
            <h1>Login</h1>
            <Box sx={{ border: '2px solid #111', borderRadius: '15px', bgcolor: '#ccc' }}>
                <div>

                    <form onSubmit={handleSubmit}  >
                        {/* <input type="text" placeholder="Enter your email" /> <br />
                    <input type="password" placeholder="Enter your password" /> <br /> */}
                        <TextField name="email" id="email" label="Email" variant="outlined" margin="normal" required /> <br />
                        <TextField name="password" id="password" label="Password" variant="outlined" margin="normal" type="password" required /> <br />
                        <Button variant="contained" type="submit" sx={{ marginBottom: '1rem' }}>Login</Button>
                        <Typography color="error"><i>{msg}</i></Typography>
                    </form>
                </div>
                <Link to={'/signup'}>
                    <Button color="secondary">Don't have an account? Click here to sign up!</Button>
                </Link>
            </Box>
        </>
    )
}

export default Login;