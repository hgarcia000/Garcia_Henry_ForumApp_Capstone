import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import EditProfile from "./EditProfile";
import Button from "@mui/material/Button";


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
            <>
                <h1>{profile.username}'s Profile</h1>
                {currentUser && currentUser._id == id ? <Button onClick={() => { setVisible(true) }}>Edit profile</Button> : ''}
                <div><i>{profile.title}</i></div>
                {profile.location ? <div>Location: {profile.location}</div> : ''}
                {profile.about ? <div>About: {profile.about}</div> : ''}
                <div>Joined at: {profile.joinedAt}</div>
            </>
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