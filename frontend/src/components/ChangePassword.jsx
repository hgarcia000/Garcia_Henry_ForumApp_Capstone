import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";


function ChangePassword({ setVisible, setIsSwitched, setMsg, userId }) {

    const URL2 = `${import.meta.env.VITE_BASEURL}/api/users/changePassword/${userId}`;
    const [formData2, setFormData2] = useState({ password: '', confirmPassword: '' });

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormData2({
            ...formData2,
            [name]: value
        });
    }

    const handleSubmit2 = async (e) => {
        try {
            e.preventDefault();
            if (formData2.password !== formData2.confirmPassword) {
                throw new Error("Passwords must match!")
            }
            await axios.patch(URL2, formData2);
            setMsg({
                text: 'Password change successful!',
                color: 'success'
            });
            setTimeout(() => { setVisible(false) }, 800);
        } catch (error) {
            console.log('ERROR:', error.message);
            setMsg({
                text: error.message,
                color: 'error'
            });
        }
    }

    return (<>
        <form onChange={handleChange2} onSubmit={handleSubmit2}>
            <TextField required type="password" name="password" id="password" label="New Password" margin="normal" /> <br />
            <TextField required type="password" name="confirmPassword" id="confirmPassword" label="Confirm Password" margin="normal" /> <br />
            <Button disabled={formData2.password?.length < 8 && formData2.confirmPassword?.length < 8} variant="contained" type="submit" sx={{ marginBottom: '1rem' }}>Change Password</Button> <br />
        </form>
        <Button color="secondary" type="button" sx={{ marginBottom: '1rem', marginRight: '22rem', height: '20px' }} onClick={() => {
            setMsg({
                text: '',
                color: ''
            });
            setIsSwitched(isSwitched => !isSwitched);
        }}>Go Back</Button>
    </>
    )
}

export default ChangePassword;