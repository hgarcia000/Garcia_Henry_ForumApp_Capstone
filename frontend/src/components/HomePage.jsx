import PostList from "./PostList";
import { useContext, useEffect, useState } from 'react';
import NavBar from "./NavBar";
import { UserContext } from "../UserContext";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


function HomePage() {

    const { currentUser } = useContext(UserContext);

    return (
        <>
            <NavBar />
            <h1>Capstone Project</h1>
            {currentUser ? <h2>Hello, {currentUser.username}!</h2> : ''}
            {currentUser ? <Link to={'/createPost'}><Button variant="contained">Create Thread</Button></Link> : ''}
            <PostList />
        </>
    )
}

export default HomePage;