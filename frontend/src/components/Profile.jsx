import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import EditProfile from "./EditProfile";
import Button from "@mui/material/Button";


function Profile() {

    const {currentUser} = useContext(UserContext);
    const params = useParams();
    const id = params.id;
    const URL = `${import.meta.env.VITE_BASEURL}/api/users/${id}`;
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

    const getData = async () => {
        try {
            const result = await axios.get(URL);
            console.log(result.data);
            setProfile(result.data);
        } catch (error) {
            console.log('ERROR:', error.message);
        }
    }

    useEffect(() => { getData() }, [visible]);

    const ProfileJSX = () => {
        return(
            <>
            <h1>{profile.username}</h1>
            {currentUser && currentUser._id == id ? <Button onClick={() => {setVisible(true)}}>Edit profile</Button> : ''}
            <div><i>{profile.title}</i></div>
            {profile.location ? <div>Location: {profile.location}</div> : ''}
            {profile.about ? <div>About: {profile.about}</div> : ''}
            <div>Joined at: {profile.joinedAt}</div>
            </>
        )
    }

    return(
        <>
        <NavBar />
        <h1>Profile Component</h1>
        {!visible ? <ProfileJSX /> : ''}
        {visible ? <EditProfile profile={profile} setVisible={setVisible} userId={id} /> : ''}
        </>
    )
}

export default Profile;