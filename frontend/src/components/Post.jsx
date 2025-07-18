import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";


function Post() {
    
    
    const params = useParams();
    const paramsId = params.id;
    const URL = `${import.meta.env.VITE_BASEURL}/api/posts/${paramsId}`;
    const [post,setPost] = useState({
        category: "",
        title: "",
        postedBy: "",
        postedAt: "",
        body: "",
        isLocked: false,
        editedAt: "",
        comments: []
    });


    const getPost = async () => {
        try {
            const result = await axios.get(URL);
            console.log(result.data);
            setPost(result.data);
        } catch (error) {
            console.log('ERROR:', error.message);
        }
    }

    useEffect(() => { getPost()}, []);

    const PostJSX = () => {
        return (
            <>
                <h2>{post.title}</h2>
                <div><i> Posted by: {post.postedBy} </i></div>
                <div>{post.body}</div>
            </>

        );
    };

    return (
        <>
            <NavBar />
            <h1>Post Component</h1>
            <PostJSX />
        </>
    )
}

export default Post;