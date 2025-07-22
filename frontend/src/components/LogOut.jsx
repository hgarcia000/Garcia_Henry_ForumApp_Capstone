import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";


function Logout() {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
        else {
            setCurrentUser(null);
            setTimeout(() => { navigate('/'); }, 1500);
        }
    }, []);

    return (
        <>
            <h1>Logout Successful!</h1>
            <h4>Returning to HomePage...</h4>
        </>
    )
}

export default Logout;