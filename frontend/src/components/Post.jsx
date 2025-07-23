import { Link, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { UserContext } from "../UserContext";
import CommentForm from "./CommentForm";


function Post() {
    
    const {currentUser} = useContext(UserContext);
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
    const [isHidden, setIsHidden] = useState(true);

    const formRef = useRef(null);

    const handleHidden = () => {

        setIsHidden(isHidden => !isHidden);
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }



    const getPost = async () => {
        try {
            const result = await axios.get(URL);
            console.log(result.data);
            setPost(result.data);
        } catch (error) {
            console.log('ERROR:', error.message);
        }
    }

    useEffect(() => { getPost()}, [isHidden]);

    const PostJSX = () => {
        return (
            <Box width={950} marginBottom={2}  sx={{ border: '2px solid #111', borderRadius: '3px', bgcolor: '#555' }}>
                <Typography variant="h3">{post.title}</Typography>
                <Link to={`/user/${post.postedBy}`}><Typography color="primary" sx={{":hover": {color: "#535bf2"}}} marginLeft={1} fontWeight={'bold'} textAlign={'justify'} ><i> {post.postedBy} </i></Typography></Link>
                <Divider />
                <Typography padding={2} minHeight={200} sx={{textAlign:'justify', bgcolor: '#333' }}>{post.body}</Typography>
                <Divider />
                <Typography paddingRight={2} paddingBottom={1} sx={{textAlign:'right',color: 'gray', bgcolor: '#333', fontSize: '11pt', fontStyle: 'italic' }}>Posted at {post.postedAt}. {post.editedAt ? ` Last edited at ${post.editedAt}.` : ''}</Typography> 
            </Box>

        );
    };

    const commentJSX = post.comments.map(element => {
        return(
        <Box key={post.comments.indexOf(element)} width={950}  sx={{ border: '2px solid #111', borderRadius: '3px', bgcolor: '#555' }}>
            <Link to={`/user/${element?.postedBy}`}><Typography color="primary" sx={{":hover": {color: "#535bf2"}}} marginLeft={1} fontWeight={'bold'} textAlign={'justify'} ><i> {element?.postedBy} </i></Typography></Link>
                <Divider />
                <Typography padding={2} minHeight={200} sx={{textAlign:'justify', bgcolor: '#333' }}>{element?.body}</Typography>
                <Divider />
                <Typography paddingRight={2} paddingBottom={1} sx={{textAlign:'right',color: 'gray', bgcolor: '#333', fontSize: '11pt', fontStyle: 'italic' }}>Posted at {element?.postedAt}. {element?.editedAt ? ` Last edited at ${element?.editedAt}.` : ''}</Typography> 
        </Box>
        )
    });

    return (
        <>
            <NavBar />
            {currentUser ? <Button color={isHidden ? 'primary' : 'error' } onClick={handleHidden} sx={{marginBottom: 1}} variant="outlined"> {isHidden ? <AddIcon /> : <CancelIcon />} {isHidden ? 'Reply to Thread' : 'Cancel Reply'}</Button> : ''}
            <PostJSX />
            {post.comments.length > 0 ? commentJSX : ''}
            {currentUser ? <Button color={isHidden ? 'primary' : 'error' } onClick={handleHidden} sx={{marginBottom: 1}} variant="outlined"> {isHidden ? <AddIcon /> : <CancelIcon />} {isHidden ? 'Reply to Thread' : 'Cancel Reply'}</Button> : ''}
            <div ref={formRef}>{!isHidden ? <CommentForm paramsId={paramsId} handleHidden={handleHidden} /> : ''}</div>
        </>
    )
}

export default Post;