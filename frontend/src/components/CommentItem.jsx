import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from "@mui/material/FormControl";
import EditComment from "./EditComment";

function CommentItem({ id, postedBy, body, postedAt, editedAt }) {

    const URL = `${import.meta.env.VITE_BASEURL}/api/comments/edit/${id}`;

    const { currentUser } = useContext(UserContext);

    const [isEditing, setIsEditing] = useState(false);

    return (
        <Box width={950} sx={{ border: '2px solid #111', borderRadius: '3px', bgcolor: '#555' }}>
            <Link to={`/user/${postedBy}`}><Typography color="primary" sx={{ ":hover": { color: "#535bf2" } }} marginLeft={1} fontWeight={'bold'} textAlign={'justify'} ><i> {postedBy} replied: </i></Typography></Link>
            <Divider />
            {isEditing? <EditComment id={id} setIsEditing={setIsEditing} body={body} /> : <Typography padding={2} minHeight={200} sx={{ textAlign: 'justify', bgcolor: '#333' }}>{body}</Typography>}
            <Divider />
            {currentUser?.username === postedBy ? <Typography paddingTop={0.5} paddingLeft={0.5} paddingRight={2} paddingBottom={1} sx={{ textAlign: 'left', color: 'gray', bgcolor: '#333', fontSize: '11pt', fontStyle: 'italic' }}><Button disabled={isEditing} variant="outlined" onClick={() => {setIsEditing(true)}}>Edit</Button></Typography> : ''}
            <Typography paddingRight={2} paddingBottom={1} sx={{ textAlign: 'right', color: 'gray', bgcolor: '#333', fontSize: '11pt', fontStyle: 'italic' }}>Posted at {postedAt}. {editedAt ? ` Last edited at ${editedAt}.` : ''}</Typography>
        </Box>
    )
}

export default CommentItem;