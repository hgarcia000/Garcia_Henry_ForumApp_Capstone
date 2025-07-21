import PostList from "./PostList";
import axios from 'axios';
import { useContext, useEffect } from 'react';
import NavBar from "./NavBar";
import { UserContext } from "../UserContext";

const URL = import.meta.env.VITE_BASEURL

function HomePage() {

    const {currentUser} = useContext(UserContext);
    return (
        <>
            <NavBar />
            <h1>HomePage Component</h1>
            {currentUser? <h2>Hello, {currentUser.username}!</h2> : ''}
            <PostList /> 
        </>
    )
}

export default HomePage;