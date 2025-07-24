import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import NavBar from "./NavBar";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

const URL = import.meta.env.VITE_BASEURL + '/api/posts/createThread';

function CreatePost() {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category: '',
        title: '',
        body: '',
        postedBy: currentUser?.username
    });

    const [msg, setMsg] = useState({
        text: '',
        color: ''
    });

    // Function to set the form data state when the input is changed.
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    // Function to handle the creation of a post.
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log('SUBMITTED!', formData);
            const result = await axios.post(URL, formData);
            const { _id } = result.data;
            setMsg({
                text: 'Thread posted successfully!',
                color: 'success'
            });

            // Navigate to the post after a delay upon a successful HTTP POST method.
            setTimeout(() => { navigate('/post/' + _id) }, 800);
        } catch (error) {
            console.log('ERROR: ', error.message);
            setMsg({
                text: error.message,
                color: 'error'
            });
        }
    }

    // If user is not logged in, redirect them to the login component.
    useEffect(() => {
        if (!currentUser) {
            return navigate('/login');
        }
    }, []);

    return (
        <>
            <NavBar />
            <h1>Create a Thread</h1>
            {/* Conditional rendering depending on whether the user is logged in. */}
            {currentUser ? <Box sx={{ minWidth: '300px', border: '2px solid #111', borderRadius: '10px', bgcolor: '#ccc' }}>
                <form onSubmit={handleSubmit}>
                    <FormControl sx={{ minWidth: 150 }} margin="normal">
                        <InputLabel id="category-select" >Category</InputLabel>
                        <Select labelId="category-select" name="category" id="category" label="Category" value={formData.category} onChange={handleChange} required >
                            <MenuItem value={"General"}>General</MenuItem>
                            <MenuItem value={"QuickQuestion"}>Quick Question</MenuItem>
                            <MenuItem value={"Discussion"}>Discussion</MenuItem>
                        </Select> <br />
                        <TextField required name="title" id="title" label="Title" onChange={handleChange} /> <br />
                        <TextareaAutosize onChange={handleChange} style={{ fontFamily: 'system-ui' }} required name="body" minRows={7} maxRows={7} placeholder="Write your post here..." /> <br />
                        <Button variant="contained" type="submit">Post Thread</Button>
                    </FormControl>
                </form>
                <Typography color={msg?.color}><i>{msg?.text}</i></Typography>
            </Box> : <h2>You're not logged in...</h2>}
        </>
    )


}

export default CreatePost;