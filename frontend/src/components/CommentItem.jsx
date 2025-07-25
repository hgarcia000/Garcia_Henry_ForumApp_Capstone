import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import EditComment from "./EditComment";
import { HiddenContext } from "../HiddenContext";

function CommentItem({ id, postedBy, body, postedAt, editedAt }) {

    const URL = `${import.meta.env.VITE_BASEURL}/api/comments/delete/${id}`;

    const { currentUser } = useContext(UserContext);
    const { isHidden, setIsHidden } = useContext(HiddenContext);

    const [isEditing, setIsEditing] = useState(false);

    // Function to delete a comment
    const handleDelete = async () => {
        try {
            const safe = confirm('Are you sure you want to delete this reply?');
            if (safe) {
                await axios.delete(URL);
                if (isHidden === 1) {
                    setIsHidden(true);
                } else {
                    setIsHidden(1);
                }
            }
        } catch (error) {
            console.log('ERROR: ', error.message);
        }
    }

    return (
        <Box width={950} sx={{ border: '2px solid #111', borderRadius: '3px', bgcolor: '#555' }}>
            <Link to={`/user/${postedBy}`}><Typography color="primary" sx={{ ":hover": { color: "#535bf2" } }} marginLeft={1} fontWeight={'bold'} textAlign={'justify'} ><i> {postedBy} replied: </i></Typography></Link>
            <Divider />
            {isEditing ? <EditComment id={id} setIsEditing={setIsEditing} body={body} /> : <Typography padding={2} minHeight={200} sx={{ whiteSpace: 'pre-line', textAlign: 'justify', bgcolor: '#333' }}>{body}</Typography>}
            <Divider />
            {/* Conditional rendering depending on whether the logged in user is the same as the postedBy user. */}
            {currentUser?.username === postedBy ? <Typography paddingTop={0.5} paddingLeft={0.5} paddingRight={2} paddingBottom={1} sx={{ textAlign: 'left', color: 'gray', bgcolor: '#333', fontSize: '11pt', fontStyle: 'italic' }}><Button disabled={isEditing} variant="outlined" onClick={() => { setIsEditing(true) }}>Edit</Button> <Button disabled={isEditing} color="error" variant="outlined" onClick={handleDelete}>Delete</Button></Typography> : ''}
            <Typography paddingRight={2} paddingBottom={1} sx={{ textAlign: 'right', color: 'gray', bgcolor: '#333', fontSize: '11pt', fontStyle: 'italic' }}>Posted at {postedAt}. {editedAt ? ` Last edited at ${editedAt}.` : ''}</Typography>
        </Box>
    )
}

export default CommentItem;