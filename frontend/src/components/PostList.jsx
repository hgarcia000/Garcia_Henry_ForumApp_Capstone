import { useEffect } from "react";
import axios from 'axios'


function PostList(){

    // const getPostData = async () => {
    //     console.log(8080);
        
    //     const result = await axios.get(`localhost:${PORT}/api/posts/`);

    //     console.log(result.data);
        
    // }

    // useEffect(() => getPostData(), [] );

    return(
        <h1>PostList Component</h1>
    )
}

export default PostList;