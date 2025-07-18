import { useEffect, useState } from "react";
import axios from 'axios'
import List from '@mui/material/List'
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import PostListItem from "./PostListItem";

const URL = import.meta.env.VITE_BASEURL

function PostList() {

    const [arr, setArr] = useState([]);

    const getPostData = async () => {
        try {
            const result = await axios.get(`${URL}/api/posts/`);

            console.log(result.data);

            setArr(result.data);
        } catch (error) {

            console.log('ERROR:', error.message);

        }

    }

    useEffect(() => { getPostData() }, []);

    const list = arr.map(element => {
        return (
        <>
            <PostListItem key={arr.indexOf(element)} id={element._id} title={element.title} postedBy={element.postedBy} />
            {(arr.indexOf(element) !== arr.length - 1) ? <Divider /> : ""}
        </>
        );
    });
    

    return (
        <>
        <div>
                    <div>PostList Component</div>
            <List>
                {list}
            </List>
        </div>
        </>
    )
}

export default PostList;