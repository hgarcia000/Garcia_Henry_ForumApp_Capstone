import PostList from "./PostList";
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import NavBar from "./NavBar";
import { UserContext } from "../UserContext";
import Button from "@mui/material/Button";
import CreatePost from "./CreatePost";
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASEURL

function HomePage() {

    const {currentUser} = useContext(UserContext);
    const [toggle, setToggle] = useState(true)
    return (
        <>
            <NavBar />
            <h1>HomePage Component</h1>
            {currentUser? <h2>Hello, {currentUser.username}!</h2> : ''}
            {currentUser ? <Link to={'/createPost'}><Button variant="contained">Create Thread</Button></Link> : ''}
            <PostList /> 
        </>
    )
}

export default HomePage;