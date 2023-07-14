import { Avatar, Badge, Box, Button, Card, FormLabel, Input, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios";
 
import CloseIcon from '@mui/icons-material/Close';
import { BACKEND_URL } from '../constants';
import { useAppContext } from '../context/appContext';
 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius:'20px',
    p: 2,
    
     
  };
  
const CollabModal = () => {

    const {currentCollabId,setCurrentCollabId}=useAppContext()

    

    
  const{setOpenModal}=useAppContext()
  const [email,setEmail] =useState("")
     
  const handleSubmit=async()=>{
    

    const share = await axios.post(`${BACKEND_URL}/collab/userCollab/shareCollab`,{email:email,collabId:currentCollabId})
    setCurrentCollabId("")
    setOpenModal(false)
  }
  return (<>
     
 <Modal
        open={true}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display:"flex"}}
      >
     
        <Box  display="flex" flexDirection="column"   sx={style}>

        < CloseIcon onClick={()=>setOpenModal(false)} sx={{alignSelf:"flex-end",cursor:"pointer"}}  ></CloseIcon>


        <Typography variant="h5" textAlign="center" mb="20px">Share Mockup</Typography>

        <TextField  
            sx={{width:'100%',mb:"20px"}}
            id="email" 
            name="email"
            label="Receipient email"
            variant="outlined"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}></TextField>
        
        <Button  sx={{margin:"auto", width:"100%",}} variant="contained" type="submit" onClick={()=>{handleSubmit()}}
           
        >Share</Button>
            
        </Box>
      </Modal>
    
      

  
    


    </>
  )
}

export default CollabModal