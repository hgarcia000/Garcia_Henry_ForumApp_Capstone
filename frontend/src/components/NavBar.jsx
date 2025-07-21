import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

function NavBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Typography variant="div" sx={{ flexGrow: 1 }}>
                        <Link to={'/'}>
                         <Typography style={{color: 'white'}}>Home</Typography>
                        </Link>
                         </Typography>
                    <Typography sx={{ flexGrow: 1 }}>Users</Typography>
                    <Typography variant="div" sx={{ flexGrow: 1 }}>
                        <Link to={'/login'}>
                        <Typography style={{color: 'white'}}>Login</Typography>
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar;