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
import CommentItem from "./CommentItem";
import { HiddenContext } from "../HiddenContext";
import EditPost from "./EditPost";


function Post() {

    const { currentUser } = useContext(UserContext);
    const params = useParams();
    const paramsId = params.id;
    const URL = `${import.meta.env.VITE_BASEURL}/api/posts/${paramsId}`;
    const [post, setPost] = useState({
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
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef(null);

    const handleHidden = () => {

        setIsHidden(isHidden => !isHidden);
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }



    // Function to be called when the component is mounted and every time an edit is successful.
    const getPost = async () => {
        try {
            const result = await axios.get(URL);
            setPost(result.data);
        } catch (error) {
            console.log('ERROR:', error.message);
        }
    }

    // Retrieving the data from the server.
    useEffect(() => { getPost() }, [isHidden]);

    const PostJSX = () => {
        return (
            <Box width={950} marginBottom={2} sx={{ border: '2px solid #111', borderRadius: '3px', bgcolor: '#555' }}>
                <Typography variant="h3">{post.title}</Typography>
                <Link to={`/user/${post.postedBy}`}><Typography color="primary" sx={{ ":hover": { color: "#535bf2" } }} marginLeft={1} fontWeight={'bold'} textAlign={'justify'} ><i> {post.postedBy} posted: </i></Typography></Link>
                <Divider />
                {isEditing ? <EditPost id={paramsId} isHidden={isHidden} setIsHidden={setIsHidden} setIsEditing={setIsEditing} title={post.title} body={post.body} /> : <Typography padding={2} minHeight={200} sx={{ whiteSpace: 'pre-line', textAlign: 'justify', bgcolor: '#333' }}>{post.body}</Typography>}
                <Divider />
                {currentUser?.username === post.postedBy ? <Typography paddingTop={0.5} paddingLeft={0.5} paddingRight={2} paddingBottom={1} sx={{ textAlign: 'left', color: 'gray', bgcolor: '#333', fontSize: '11pt', fontStyle: 'italic' }}><Button disabled={isEditing} variant="outlined" onClick={() => { setIsEditing(true) }}>Edit</Button> </Typography> : ''}
                <Typography paddingRight={2} paddingBottom={1} sx={{ textAlign: 'right', color: 'gray', bgcolor: '#333', fontSize: '11pt', fontStyle: 'italic' }}>Posted at {post.postedAt}. {post.editedAt ? ` Last edited at ${post.editedAt}.` : ''}</Typography>
            </Box>

        );
    };

    const commentJSX = post.comments.map(element => {
        return (
            <CommentItem key={post.comments.indexOf(element)} id={element._id} postedAt={element.postedAt} postedBy={element.postedBy} editedAt={element.editedAt} body={element.body} />
        )
    });

    return (
        <HiddenContext.Provider value={{ isHidden, setIsHidden }}>
            <NavBar />
            {/* If user is logged in, render the button that allows the user to reply. */}
            {currentUser ? <Button color={isHidden ? 'primary' : 'error'} onClick={handleHidden} sx={{ marginBottom: 1 }} variant="outlined"> {isHidden ? <AddIcon /> : <CancelIcon />} {isHidden ? 'Reply to Thread' : 'Cancel Reply'}</Button> : ''}
            <PostJSX />
            {post.comments.length > 0 ? commentJSX : ''}
            {currentUser ? <Button color={isHidden ? 'primary' : 'error'} onClick={handleHidden} sx={{ marginTop: 1 }} variant="outlined"> {isHidden ? <AddIcon /> : <CancelIcon />} {isHidden ? 'Reply to Thread' : 'Cancel Reply'}</Button> : <Link to={'/login'}><Button color="info" variant="contained" sx={{ marginTop: 1 }}>You must be logged in to reply.</Button></Link>}
            <div ref={formRef}>{!isHidden ? <CommentForm paramsId={paramsId} handleHidden={handleHidden} /> : ''}</div>
        </HiddenContext.Provider>
    )
}

export default Post;