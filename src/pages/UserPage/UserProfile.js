import React, { useContext, useEffect, useRef, useState } from 'react'
 
import { Avatar, Box, Button, Divider, Pagination, Stack, TextField, Typography } from '@mui/material'
 
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import { useForm, SubmitHandler } from "react-hook-form"
import CreateOptions from '../../components/CreateOptions'
import PersonalisedStoryForm from '../../components/PersonalisedStoryForm'
import CreateStory from '../../components/CreateStory'
import { useAppContext } from '../../context/appContext'
import CircularProgress from '@mui/material/CircularProgress';
import { useOnDraw } from '../../components/Hooks'
import Canvas from '../../components/DrawingCanvas'
import html2canvas from 'html2canvas'
import { storage } from '../../firebase';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import BrushIcon from '@mui/icons-material/Brush';
import Crop169Icon from '@mui/icons-material/Crop169';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import createIllustration from '../../utils/createIllustration';
import IllustrationCard from '../../components/IllustrationCard';
import UserRow from '../../components/UserRow';
import StoryCover from '../../components/StoryCover';
import IllustrationGallery from '../IllustrationPage/IllustrationGallery';
import IllustrationGrid from '../../components/IllustrationGrid/IllustrationGrid';
import StoryGrid from '../../components/StoryGrid/StoryGrid';
import LikeGrid from '../../components/LikeGrid/LikeGrid';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from '../../components/CustomTabPanel';
import UserCollabGrid from '../../components/CollabGrid/UserCollabGrid';
 
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const UserProfile = () => {

    const [users,setUsers] = useState([])
    const {currentUserId,selectedUserId} = useAppContext()
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
     
    const user ={
        currentUserId:currentUserId,
        firstName:"d",
        lastName:"",
        email:"",
        biography:""

    }
    const [userInfo,setUserInfo] = useState(user)
    const [storiesArray,setStoriesArray] = useState([]) 
    const [pageCount,setPageCount] = useState("")
    const [pageNumber,setPageNumber] = useState(1)
    const [resultCount,setResultCount] =useState("")
    
    
    useEffect(()=>{
        const getUsers=async ()=>{
            await axios.get(`${BACKEND_URL}/auth/users/${selectedUserId}`).then((res)=>{
                  setUserInfo({...userInfo,
                    firstName:res.data[0].firstName,
                    lastName:res.data[0].lastName,
                    email:res.data[0].email,
                    picture:res.data[0].picture,
                    biography:res.data[0].biography,                   
                
                    }
                   
                  
                  )
                  console.log(res.data)

             })

        
            }

            const getStories=async ()=>{
                // const story = axios.get(`${BACKEND_URL}/story/${pageNumber-1}/6/?ageId=${values.ageId}&genreId=${values.genreId}&searchText=${values.searchText}`).then((res)=>{ 
                await axios.get(`${BACKEND_URL}/story/${selectedUserId}/${pageNumber-1}/1`).then((res)=>{
                     console.log(res.data[0])
                     setStoriesArray(res.data?.allStory.rows)
                     setResultCount(res.data?.allStory.count)
                     setPageCount(Math.ceil(res.data?.pageCount))
                     setResultCount(res.data?.count)
                })          
             }
    
        getStories()

        getUsers()
    
    
    
    },[pageNumber])
        

 
  return (<>


       

    <Box sx={{background:"white",padding:"20px",borderRadius:"20px", justifyContent:"center",display:"flex",flexDirection:"column",background:"#f8fafc"}}>
    <Stack direction="column" sx={{marginBottom:"50px"}} >
        <Stack direction="row" sx={{width:"100%"}}>
       <Box component="img" src={userInfo.picture} sx={{borderRadius:"50%", width:"50px"}}></Box>
       <Stack direction="column" sx={{paddingLeft:"20px"}}>
        <Typography fontWeight="bold" textTransform="uppercase">{userInfo.firstName + userInfo.lastName }</Typography>
        <Typography>{userInfo.email}</Typography>
        <Typography fontWeight={"thin"}>{userInfo.biography}</Typography>

       </Stack>
       </Stack >
       

       

    </Stack>
  
    

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Stories" {...a11yProps(0)} />
          <Tab label="Collaborations" {...a11yProps(1)} />
          <Tab label="Illustrations" {...a11yProps(2)} />
          <Tab label="Likes" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <StoryGrid userId={selectedUserId} type={"none"}/>       
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
     <UserCollabGrid userId={selectedUserId} />
    
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <IllustrationGrid userId={selectedUserId} type={"none"}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <LikeGrid userId={selectedUserId} type={"none"} />
      </CustomTabPanel>
    </Box>

  
   
 
      
    
         

    </Box>
 

           
    

        

    
    </>

    
    
  )
}

export default UserProfile
