import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";


function PostListItem({ id, title, postedBy, postedAt }) {

    return (
        <ListItem>
            <Link to={'/post/' + id}>
                <div>
                    <h4>{title}</h4>
                    <div><i> Posted by: {postedBy} at {postedAt} </i> </div>
                </div>
            </Link>
        </ListItem>
    )
}

export default PostListItem;