import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { theme } from '../theme';
 
//Icons 
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SearchIcon from '@mui/icons-material/Search';
import Filter1Icon from '@mui/icons-material/Filter1';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import GradeIcon from '@mui/icons-material/Grade';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAppContext } from '../context/appContext';
 
const drawerWidth = 240;
const offWhite =  "#e2e8f0" 
const indigo = "#4f46e5"
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SharedLayout() {

  const {setOption} = useAppContext()
  const navigate= useNavigate()

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{background:indigo}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ color:"white",mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,   
               
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border:0
          },

        }}
        variant="persistent"
        anchor="left"
        open={open}
         
      >
        <DrawerHeader sx={{background:'#141818',border:0}}>
          <IconButton sx={{color:offWhite}}onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
 
       
        <List  sx={{padding:0,background:'#141818',height:"100%"  }}>
          
            <ListItem sx={{padding:0,marginTop:0}} >
              <Box sx={{width:"100%"}}>                       
                <Typography sx={{color:offWhite,color:offWhite,fontWeight:"medium" ,fontSize:"20px",paddingLeft:"20px",paddingTop:"5px",paddingBottom:"5px"}}>Create</Typography>
                <ListItemButton onClick={ ()=>{
                  navigate("/create") 
                  setOption("")}} sx={{color:offWhite,paddingLeft:"40px",paddingTop:"5px",paddingBottom:"5px",width:"100%",fontWeight:"light"}}>
                 <MenuBookIcon sx={{marginRight:"10px"}}/> Stories
                </ListItemButton>
                <ListItemButton sx={{color:offWhite,paddingLeft:"40px",paddingTop:"5px",paddingBottom:"5px",fontWeight:"light"}}>
                <InsertPhotoIcon sx={{marginRight:"10px"}}/> Illustration
                </ListItemButton>
              </Box>              
            </ListItem>

            <ListItem sx={{padding:0,marginTop:0}} >
              <Box sx={{width:"100%"}}>                       
                <Typography sx={{color:offWhite,color:offWhite,fontWeight:"medium" ,fontSize:"20px",paddingLeft:"20px",paddingTop:"5px",paddingBottom:"5px"}}>Discover</Typography>
                <ListItemButton  onClick={()=>navigate('/browse')}sx={{color:offWhite,paddingLeft:"40px",paddingTop:"5px",paddingBottom:"5px",width:"100%",fontWeight:"light"}}>
                <SearchIcon sx={{marginRight:"10px"}}/>Browse
                </ListItemButton>
                <ListItemButton sx={{color:offWhite,paddingLeft:"40px",paddingTop:"5px",paddingBottom:"5px",fontWeight:"light"}}>
                <Filter1Icon sx={{marginRight:"10px"}}/>Top Picks
                </ListItemButton>
                <ListItemButton sx={{color:offWhite,paddingLeft:"40px",paddingTop:"5px",paddingBottom:"5px",fontWeight:"light"}}>
                <EditIcon sx={{marginRight:"10px"}}/>Authors
                </ListItemButton>
              </Box>              
            </ListItem>

            <ListItem sx={{padding:0,marginTop:0}} >
              <Box sx={{width:"100%"}}>                       
                <Typography sx={{color:offWhite,fontWeight:"medium" ,fontSize:"20px",paddingLeft:"20px",paddingTop:"5px",paddingBottom:"5px"}}>My Library</Typography>
                <ListItemButton  sx={{color:offWhite,paddingLeft:"40px",paddingTop:"5px",paddingBottom:"5px",width:"100%",fontWeight:"light"}}>
                <MenuBookIcon sx={{marginRight:"10px"}}/>Stories
                </ListItemButton>
                <ListItemButton sx={{color:offWhite,paddingLeft:"40px",paddingTop:"5px",paddingBottom:"5px",fontWeight:"light"}}>
                <GroupIcon sx={{marginRight:"10px"}}/>Collaborations
                 </ListItemButton>
              </Box>              
            </ListItem>

            <ListItem sx={{padding:0,marginTop:0}} >
              <Box sx={{width:"100%"}}>                       
                <Typography sx={{color:offWhite,fontWeight:"medium" ,fontSize:"20px",paddingLeft:"20px",paddingTop:"5px",paddingBottom:"5px"}}>My Profile</Typography>
                <ListItemButton  sx={{color:offWhite,paddingLeft:"40px",paddingTop:"5px",paddingBottom:"5px",width:"100%",fontWeight:"light"}}>
                <SettingsIcon sx={{marginRight:"10px"}}/>Settings
                </ListItemButton>
                <ListItemButton sx={{color:offWhite,paddingLeft:"40px",paddingTop:"5px",paddingBottom:"5px",fontWeight:"light"}}>
                <GradeIcon sx={{marginRight:"10px"}}/>Liked Stories</ListItemButton>
              </Box>              
            </ListItem>
           
        </List>
         
        
      </Drawer>
      <Main open={open} sx={{background:"black", height:"100vh" }}>
        <Box sx={{marginTop:10}}>          
         <Outlet />
        </Box>
       
         
      </Main>
    </Box>
  );
}