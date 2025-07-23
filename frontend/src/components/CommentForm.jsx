import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

 const CommentForm = ({paramsId, handleHidden}) => {
    const {currentUser} = useContext(UserContext);
    const URL2 = `${import.meta.env.VITE_BASEURL}/api/posts/addComment/${paramsId}`;
    const [formData, setFormData] = useState({
        thread_id: paramsId,
        body: '',
        postedBy: currentUser?.username
    });

    const [msg, setMsg] = useState({
        text: '',
        color: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
            try {
                e.preventDefault();
                await axios.post(URL2, formData);
                handleHidden();
            } catch (error) {
                console.log('ERROR: ', error.message);
                setMsg({
                    text: error.message,
                    color: 'error'
                });
            }
        }

        return(
            <Box sx={{ minWidth: '300px', border: '2px solid #111', borderRadius: '10px', bgcolor: '#ccc' }} >
                <form onSubmit={handleSubmit} >
                    <FormControl sx={{ minWidth: 900 }} margin="normal" >
                        <TextareaAutosize onChange={handleChange} style={{ fontFamily: 'system-ui' }} required name="body" id="body" minRows={7} maxRows={7} placeholder="Write your comment here..." /> <br />
                        <Button variant="contained" type="submit">Post Comment</Button>
                    </FormControl>
                </form>
                <Typography color={msg?.color}><i>{msg?.text}</i></Typography>
            </Box>
        )
}

export default CommentForm;