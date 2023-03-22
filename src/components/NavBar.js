import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const NavBar = (props) => {
    const navigate = useNavigate()

    const logout = ()=> {
        props.onAuthenticated(false);
        navigate('/')
    };

    const register = ()=> {
        props.onAuthenticated(false);
        navigate('/register')
    };
   
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    return (        
        <Grid className='nav' item xs={12}>
            <Button variant="secondary" component={Link} to='/'>Home</Button>
          
            {/* Login and Register Button with logout if authenticated**/} 
                
                {(!props.authenticated) ? (
                    <Button variant="secondary" onClick={register}>Register</Button>
                ) : ""}   
                    
                {(props.authenticated) ? (
                    <Button variant="secondary" onClick={logout}>Logout</Button>
                ) : ""} 

                <Button
                    id="button1"
                    variant="secondary"
                    aria-controls={open ? 'menu1' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    >
                        Vehicles
                </Button>
                <Menu
                    id="menu1"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'button1',
                    }}
                >        
                    <MenuItem component={Link} to='/vehicles/create' onClick={handleClose}>Create</MenuItem>
                </Menu>
                <Button
                    id="button2"
                    variant="secondary"
                    aria-controls={open ? 'menu2' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}    
                    onClick={handleClick1}
                >
                    Events
                </Button>
                <Menu
                    id="menu2"
                    anchorEl={anchorEl1}
                    open={open1}
                    onClose={handleClose1}
                    MenuListProps={{
                    'aria-labelledby': 'button2',
                    }}
                >  
                    <MenuItem component={Link} to='/events/create' onClick={handleClose1}>Create</MenuItem>
                </Menu> 
                <Button
                    id="button3"
                    variant="secondary"
                    aria-controls={open ? 'menu3' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' :undefined}
                    onClick={handleClick2}
                >
                    Dashboard
                </Button>
                <Menu
                    id="menu3"
                    anchorEl={anchorEl2}
                    open={open2}
                    onClose={handleClose2}
                    MenuListProps={{'aria-labelledby': 'button3'}}
                >    
                    <MenuItem component={Link} to='/dashboard' onClick={handleClose2}>View Profile</MenuItem>
                </Menu>                          
        </Grid>       
    )
};
/* exporting the NavBar */
export default NavBar;