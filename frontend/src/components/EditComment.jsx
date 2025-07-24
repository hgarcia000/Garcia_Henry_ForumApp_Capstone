import FormControl from "@mui/material/FormControl";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import axios from "axios";
import { HiddenContext } from "../HiddenContext";

function EditComment({ id, setIsEditing, body }) {

    const URL = `${import.meta.env.VITE_BASEURL}/api/comments/edit/${id}`;

    const {isHidden, setIsHidden} = useContext(HiddenContext);

    const [formData, setFormData] = useState({
        body: body
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
            await axios.put(URL, formData);
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
        <form style={{ height: '200px' }} onSubmit={handleSubmit} >
            <FormControl sx={{ minWidth: 900 }} margin="normal" >
                <TextareaAutosize onChange={handleChange} style={{ fontFamily: 'system-ui' }} required name="body" id="body" minRows={7} maxRows={7} placeholder="Write your comment here..." defaultValue={body} /> <br />
                <Button variant="contained" type="submit" disabled={formData.body === body}>Save</Button>
            </FormControl>
            <Typography color={msg?.color}><i>{msg?.text}</i></Typography>
            <Button variant="contained" color="error" onClick={() => { setIsEditing(false) }} >Cancel</Button>
        </form>
    )
}

export default EditComment;