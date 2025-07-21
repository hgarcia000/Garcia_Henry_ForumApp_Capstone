import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";


function Profile() {

    const params = useParams();
    const id = params.id;
    const URL = `${import.meta.env.VITE_BASEURL}/api/users/${id}`;

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

    useEffect(() => { getData() }, []);

    const ProfileJSX = () => {
        return(
            <>
            <h1>{profile.username}</h1>
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
        <ProfileJSX />
        </>
    )
}

export default Profile;