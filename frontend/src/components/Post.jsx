import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";


function Post() {

    const paramsId = useParams().id;
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

    const URL = `${import.meta.env.VITE_BASEURL}/api/posts/${paramsId}`;

    return (
        <>
            <NavBar />
            <h1>Post Component</h1>
        </>
    )
}

export default Post;