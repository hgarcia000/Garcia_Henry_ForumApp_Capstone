import { useEffect, useState } from "react";
import axios from 'axios'
import List from '@mui/material/List'
import Divider from "@mui/material/Divider";
import PostListItem from "./PostListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const URL = import.meta.env.VITE_BASEURL

function PostList() {

    const [arr, setArr] = useState([]);

    // Function to be called when the component is first mounted.
    const getPostData = async () => {
        try {
            const result = await axios.get(`${URL}/api/posts/`);

            // Reversing the result array so that the newest posts are shown first.
            setArr(result.data.reverse());
        } catch (error) {

            console.log('ERROR:', error.message);

        }

    }

    // Retrieving the data from the server.
    useEffect(() => { getPostData() }, []);

    // Mapping the state array to individual JSX elements.
    const list = arr.map(element => {
        return (
            <Box key={arr.indexOf(element)} width={900} sx={{ border: '2px solid #111', borderRadius: '1px', bgcolor: '#555' }}>
                <PostListItem key={arr.indexOf(element)} id={element._id} title={element.title} postedBy={element.postedBy} postedAt={element.postedAt} />
                {(arr.indexOf(element) !== arr.length - 1) ? <Divider /> : ""}
            </Box>
        );
    });


    return (
        <>
            <List>
                <Typography variant="h5" sx={{ border: '2px solid #111', bgcolor: '#111', fontWeight: 'bold' }}>Thread List</Typography>
                {list}
            </List>
        </>
    )
}

export default PostList;