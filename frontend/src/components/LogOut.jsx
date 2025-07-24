import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";


function LogOut() {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Function to handle logging out a user.
    useEffect(() => {
        // If the user is already logged out, navigate them to the home page.
        if (!currentUser) {
            navigate('/');
        }
        else {
            setCurrentUser(null);
            setTimeout(() => { navigate('/'); }, 1750);
        }
    }, []);

    return (
        <>
            <h1>Logout Successful!</h1>
            <h4>Returning to HomePage...</h4>
        </>
    )
}

export default LogOut;