import React, { useContext, useEffect, useRef, useState } from 'react'
 
import { Avatar, Box, Button, Pagination, Stack, TextField, Typography } from '@mui/material'
 
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
 
const UserSettings = () => {

    const [users,setUsers] = useState([])
    const {currentUserId} = useAppContext()
     
    const user ={
        currentUserId:currentUserId,
        firstName:"d",
        lastName:"",
        email:"",
        biography:""

    }
    const [userInfo,setUserInfo] = useState(user)
    
    const handleSubmit = async()=>{

        console.log("hi")
         
       await axios.patch(`${BACKEND_URL}/auth/users/`,userInfo).then((res)=>{
        console.log(res.data)
       })

    }
    useEffect(()=>{
        const getUsers=async ()=>{
            await axios.get(`${BACKEND_URL}/auth/users/${currentUserId}`).then((res)=>{
                  setUserInfo({...userInfo,
                    firstName:res.data[0].firstName,
                    lastName:res.data[0].lastName,
                    email:res.data[0].email,
                    picture:res.data[0].picture,
                    biography:res.data[0].biography,
                    
                
                    }
                  
                  )
                

             })

        
            }

        getUsers()
    
    
    
    },[])
        

 const handleChange = (e)=>{
    setUserInfo({...userInfo,[e.target.name]:e.target.value})
 }
 
  return (<>


       

    <Box sx={{background:"white",padding:"20px",borderRadius:"20px", justifyContent:"center",display:"flex",flexDirection:"column",background:"#f8fafc"}}>
     
      <Box sx={{  
        columnGap:"10px",
        rowGap:"20px",
        margin:"  auto",
        display: 'flex',  
        width:"100%",
        flexDirection:"column"}} >

        <formControl onSubmit={()=>{handleSubmit()}}>
        <Typography sx={{fontWeight:"bold" ,marginBottom:"20px"}}>Avatar</Typography>
        <Avatar alt="Remy Sharp" src={userInfo.picture}  sx={{marginBottom:"20px",width:"60px",height:'60px'}}/>
           
        <Typography sx={{fontWeight:"bold" }}>First name</Typography>
        <TextField  name="firstName" value={userInfo.firstName} onChange={(e)=>{handleChange(e)}}  sx={{ width:"100%",marginBottom:"20px"}}></TextField>

        <Typography sx={{fontWeight:"bold" }}>Last name</Typography>
        <TextField  name="lastName" onChange={(e)=>{handleChange(e)}}  value={userInfo.lastName} sx={{ width:"100%",marginBottom:"20px"}}></TextField>

        <Typography sx={{fontWeight:"bold" }}>Email</Typography>
        <TextField  name="email" onChange={(e)=>{handleChange(e)}}  value={userInfo.email} sx={{ width:"100%",marginBottom:"20px"}}></TextField>

        <Typography sx={{fontWeight:"bold" }}>Bio</Typography>
        <TextField name="biography" onChange={(e)=>{handleChange(e)}}  value={userInfo.biography} sx={{ width:"100%",marginBottom:"20px"}}></TextField>

        <Button onClick={()=>{handleSubmit()}} sx={{justifySelf:"flex-end"}} variant="contained">Save</Button>


        


        </formControl>

        

         

    </Box>
</Box>

           
    

        

    
    </>

    
    
  )
}

export default UserSettings
