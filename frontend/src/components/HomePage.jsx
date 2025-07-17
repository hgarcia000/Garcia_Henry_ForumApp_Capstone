// import PostList from "./PostList";
import axios from 'axios';
import { useEffect } from 'react';

const URL = import.meta.env.VITE_BASEURL

function HomePage() {

    const getPostData = async () => {
        try {
            const result = await axios.get(`${URL}/api/posts/`);

            console.log(result.data);
        } catch (error) {
            
            console.log('ERROR:', error.message);

        }

    }

    useEffect(() => {getPostData()}, []);
    return (
        <>
            <h1>HomePage Component</h1>
            {/* <PostList /> */}
        </>
    )
}

export default HomePage;