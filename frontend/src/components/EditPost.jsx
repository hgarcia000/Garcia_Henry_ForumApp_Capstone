import axios from "axios";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


function EditPost({ id, isHidden, setIsHidden, setIsEditing, title, body }) {

    const URL = `${import.meta.env.VITE_BASEURL}/api/posts/editThread/${id}`;

    const [formData, setFormData] = useState({
        title: title,
        body: body
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

    // Function to handle the editing of a post.
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.patch(URL, formData);
            setIsEditing(false);
            if (isHidden === 1) {
                setIsHidden(true);
            } else {
                setIsHidden(1);
            }
        } catch (error) {
            console.log('ERROR: ', error.message);
            setMsg({
                text: error.message,
                color: 'error'
            });
        }
    }

    return (
        <Box minHeight={350}>
            <form style={{ height: '200px' }} onSubmit={handleSubmit} >
                <FormControl sx={{ minWidth: 900 }} margin="normal" >
                    <TextField required name="title" id="title" label="Title" onChange={handleChange} defaultValue={title} /> <br />
                    <TextareaAutosize onChange={handleChange} style={{ fontFamily: 'system-ui' }} required name="body" id="body" minRows={7} maxRows={7} placeholder="Write your body here..." defaultValue={body} /> <br />
                    {/* If the title and body form input is the same as the previous title and body, the save button is disabled. */}
                    <Button variant="contained" type="submit" disabled={formData.body === body && formData.title === title}>Save</Button>
                </FormControl>
                <Typography color={msg?.color}><i>{msg?.text}</i></Typography>
                <Button variant="contained" color="error" onClick={() => { setIsEditing(false) }} >Cancel</Button>
            </form>
        </Box>
    )

}

export default EditPost;