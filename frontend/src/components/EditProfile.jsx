import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import ChangePassword from "./ChangePassword";


function EditProfile({ profile, setVisible, userId }) {

    const URL = `${import.meta.env.VITE_BASEURL}/api/users/editInfo/${userId}`;
    const [formData, setFormData] = useState({ ...profile });
    const [isSwitched, setIsSwitched] = useState(false);

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
            setMsg({
                text: 'Profile edit successful!',
                color: 'success'
            });
            setTimeout(() => { setVisible(false) }, 800);
        } catch (error) {
            console.log('ERROR:', error.message);
            setMsg({
                text: 'An error has occured!',
                color: 'error'
            });
        }
    }

    return (
        <>
            <Box sx={{ border: '2px solid #111', borderRadius: '15px', bgcolor: '#ccc' }}>
                {isSwitched ?
                    <ChangePassword setIsSwitched={setIsSwitched} setMsg={setMsg} userId={userId} setVisible={setVisible} />
                    :
                    <>
                        <form onChange={handleChange} onSubmit={handleSubmit}>
                            <TextField focused name="title" id="title" label="Title" margin="normal" defaultValue={profile.title} /> <br />
                            <TextField focused name="location" id="location" label="Location" margin="normal" defaultValue={profile.location} /> <br />
                            <TextField focused fullWidth name="about" id="about" label="About" margin="normal" defaultValue={profile.about} /> <br />
                            <Button disabled={JSON.stringify(formData) === JSON.stringify(profile)} variant="contained" type="submit" sx={{ marginBottom: '1rem' }}>Save</Button> <br />
                        </form>
                        <Button color="secondary" type="button" sx={{ marginBottom: '1rem', marginRight: '22rem', height: '20px' }} onClick={() => {
                            setMsg({
                                text: '',
                                color: ''
                            });
                            setIsSwitched(isSwitched => !isSwitched);
                        }}>Change Password</Button>
                    </>
                }
                <Typography color={msg?.color}><i>{msg?.text}</i></Typography>
                <Button color="error" type="button" sx={{ marginBottom: '1rem', marginRight: '-22rem', height: '20px' }} onClick={() => { setVisible(false) }}>Cancel</Button>
            </Box>
        </>
    )
}

export default EditProfile;