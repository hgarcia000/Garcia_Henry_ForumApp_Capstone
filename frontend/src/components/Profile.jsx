import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import EditProfile from "./EditProfile";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";


function Profile() {

    const { currentUser } = useContext(UserContext);
    const params = useParams();
    const id = params.id;
    const uName = params.username;
    const URL = `${import.meta.env.VITE_BASEURL}/api/users/${id}`;
    const URL2 = `${import.meta.env.VITE_BASEURL}/api/users?username=${uName}`;
    const [visible, setVisible] = useState(false);

    const [profile, setProfile] = useState({
        _id: '',
        username: '',
        title: '',
        authoriztionLevel: '',
        location: '',
        about: '',
        joinedAt: ''
    });

    // Function to be called when the component is first mounted and every time the profile is edited.
    const getData = async () => {
        try {
            if (id) {
                const result = await axios.get(URL);
                setProfile(result.data);
            } else {
                const result = await axios.get(URL2);
                setProfile(result.data);
            }
        } catch (error) {
            console.log('ERROR:', error.message);
        }
    }

    // Retrieving the data from the server.
    useEffect(() => { getData() }, [visible]);

    const ProfileJSX = () => {
        return (
            <Box sx={{ border: '2px solid #111', borderRadius: '1px', bgcolor: '#555' }}>
                {/* <h1>{profile.username}'s Profile</h1> */}
                <Typography variant="h1" sx={{ border: '2px solid #111', bgcolor: '#111' }}>{profile.username}'s Profile</Typography>
                {currentUser && currentUser._id == id ? <Button onClick={() => { setVisible(true) }}>Edit profile</Button> : ''}
                <Typography variant="div" sx={{ fontStyle: 'italic' }}>{profile.title}</Typography>
                <Divider />
                {profile.location ? <div>Location: {profile.location}</div> : ''}
                <Divider />
                <div>Joined at: {profile.joinedAt}</div>
                {profile.about ?
                <>
                <Typography variant="h5" sx={{ fontStyle: 'italic', bgcolor: '#212121', textAlign:'left' }}>About me</Typography>
                <Divider />
                 <div>{profile.about}</div>
                </>
                  : ''}
                <Divider />
            </Box>
        )
    }

    return (
        <>
            <NavBar />
            {!visible ? <ProfileJSX /> : ''}
            {visible ? <EditProfile profile={profile} setVisible={setVisible} userId={id} /> : ''}
        </>
    )
}

export default Profile;