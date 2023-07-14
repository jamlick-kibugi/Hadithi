import { Button, Card, CardMedia, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Fade from '@mui/material/Fade';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from '../context/appContext';
import CreateIcon from '@mui/icons-material/Create';
import GroupIcon from '@mui/icons-material/Group';
 
const CollabCard = ({prompt,collabId,setIsEditing,coverUrl}) => {
    // const [members,setMembers] =useState([createdBy])

    const {setCurrentCollabId,openModal,setOpenModal}=useAppContext()

    const handleClick=async()=>{
        setIsEditing(true)
        setCurrentCollabId(collabId)
    }


     
    
  return (<>
  <Card sx={{padding:"10px"}}>
  <CardMedia
          component="img"
          height="300"
          image={coverUrl}
          alt="green iguana"
        />
    <Typography>{prompt}</Typography>
    <Typography>Created By: </Typography>
    <Typography>Members</Typography>
    <Button onClick={()=>{handleClick()}}variant="contained"><CreateIcon/></Button>
    <Button onClick={()=>{
      setOpenModal(true)
      console.log(collabId)
      setCurrentCollabId(collabId)}}variant="contained"><GroupIcon/></Button>
  </Card>
    </>
  )
}

export default CollabCard
