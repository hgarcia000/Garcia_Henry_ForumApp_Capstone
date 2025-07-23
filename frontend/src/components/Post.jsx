import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


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
            <Box width={950}  sx={{ border: '2px solid #111', borderRadius: '3px', bgcolor: '#555' }}>
                <Typography variant="h3">{post.title}</Typography>
                <Typography marginLeft={1} textAlign={'justify'} ><i> {post.postedBy} </i></Typography>
                <Divider />
                <Typography padding={2} minHeight={200} sx={{textAlign:'justify', bgcolor: '#333' }}>{post.body}</Typography>
                <Divider />
                <Typography paddingRight={2} paddingBottom={1} sx={{textAlign:'right',color: 'gray', bgcolor: '#333', fontSize: '11pt', fontStyle: 'italic' }}>Posted at {post.postedAt}. {post.editedAt ? ` Last edited at ${post.editedAt}.` : ''}</Typography> 
            </Box>

        );
    };

    return (
        <>
            <NavBar />
            <PostJSX />
        </>
    )
}

export default Post;