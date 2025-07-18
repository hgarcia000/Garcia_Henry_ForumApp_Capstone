import PostList from "./PostList";
import axios from 'axios';
import { useEffect } from 'react';
import NavBar from "./NavBar";

const URL = import.meta.env.VITE_BASEURL

function HomePage() {

    return (
        <>
            <NavBar />
            <h1>HomePage Component</h1>
            <PostList /> 
        </>
    )
}

export default HomePage;