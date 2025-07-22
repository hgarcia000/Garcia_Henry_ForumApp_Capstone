import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



function Signup() {

    return(
        <>
        <NavBar />
        <h1>Signup to Be a Member!</h1>
        <Box sx={{ border: '2px solid #111', borderRadius: '15px', bgcolor: '#ccc' }}>
            <form >
                <TextField name="username" id="username" label="Username" variant="outlined" margin="normal" required /> <br />
                <TextField name="email" id="email" label="Email" variant="outlined" margin="normal" required /> <br />
                <TextField type="password" name="password" id="password" label="Password" variant="outlined" margin="normal" required /> <br />
                <TextField type="password" name="confirmPassword" id="confirmPassword" label="Confirm Password" variant="outlined" margin="normal" required /> <br />
                <TextField name="location" id="location" label="Location" variant="outlined" margin="normal" /> <br />
                <TextField sx={{width: '98%'}} name="about" id="about" label="About" variant="outlined" margin="normal" /> <br />
                <Button variant="contained" type="submit" sx={{ marginBottom: '1rem' }}>Sign Up</Button>
            </form>
        </Box>
        </>
    )
}

export default Signup;