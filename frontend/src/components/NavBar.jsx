import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";

function NavBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }}>Home</Typography>
                    <Typography sx={{ flexGrow: 1 }}>Users</Typography>
                    <Typography sx={{ flexGrow: 1 }}>Login</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar;