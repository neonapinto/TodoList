import { ReactElement, FC } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';


const Header:FC<any> = ({refresh, addItem, removeAll}) : ReactElement =>{
    const handleAdd = () =>{
        const value = prompt('Enter the item');
        if(value?.trim() && value){
            addItem(value);
        }
    }
        
    return(
    

            <AppBar position="static">
                <Toolbar>
                    <Box  sx={{flexGrow: 1 }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box >
                        <IconButton
                            size="large"
                            aria-label="Add"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleAdd}
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="refresh"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={refresh}
                        >
                            <RefreshIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="delete"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={removeAll}
                        >
                            <DeleteSweepIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
    
        
    )
}
//{data}

export default Header;