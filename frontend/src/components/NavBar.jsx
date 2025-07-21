import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext.js";

function NavBar() {

    const {currentUser} = useContext(UserContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Typography variant="div" sx={{ flexGrow: 1 }}>
                        <Link to={'/'}>
                         <Typography className="nav-link" >Home</Typography>
                        </Link>
                         </Typography>
                    <Typography sx={{ flexGrow: 1 }}>Users</Typography>
                    <Typography variant="div" sx={{ flexGrow: 1 }}>
                        {currentUser ? <Link to={'/profile/' + currentUser._id}>
                        <Typography className="nav-link">Profile</Typography>
                        </Link> : <Link to={'/login'}>
                        <Typography className="nav-link" >Login</Typography>
                        </Link>}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar;