import { Button, Card, CardMedia, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Fade from '@mui/material/Fade';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from '../context/appContext';
import CreateIcon from '@mui/icons-material/Create';
import GroupIcon from '@mui/icons-material/Group';
const indigo = "#4f46e5"
const CollabCard = ({type,prompt,collabId,setIsEditing,coverUrl,name,creatorId,collabs,setCollabs}) => {
    // const [members,setMembers] =useState([createdBy])
  const navigate = useNavigate()
    const [creatorName,setCreatorName] =useState("")
    const [memberName,setMemberName]=useState([])

    const {setCurrentCollabId,openModal,setOpenModal}=useAppContext()

    const handleClick=async()=>{
        setIsEditing(true)
        setCurrentCollabId(collabId)
    }

    const handleDelete=async()=>{
      await axios.delete(`${BACKEND_URL}/collab/userCollab/${collabId}`)         
      setCollabs(collabs.filter((collab)=>{
        return collab.id !== collabId
      }))
    }

    useEffect(()=>{

      console.log(creatorId)

      const getCreatorName=async()=>{

        await axios.get(`${BACKEND_URL}/auth/users/${creatorId}`).then((res)=>{
          setCreatorName([res.data[0]?.firstName,res.data[0]?.lastName])
          
        })

      }

      const getMemberName =async()=>{

        await axios.get(`${BACKEND_URL}/collab/userCollab/members/${collabId}`).then((res)=>{
          console.log(res.data)
          setMemberName( res.data)
          
        })
 

      }

      getCreatorName()
      getMemberName()


     

    },[])


     
    
  return (<>
  <Card sx={{padding:"10px"}}>
     
  <CardMedia
          component="img"
          height="300"
          image={coverUrl}
          alt="green iguana"
        />
    <Typography fontSize="20px">{prompt}</Typography>
    <Typography>Created By: {creatorName[0]}{" "}{creatorName[1]} </Typography>
    <Typography>Members: {memberName.map((name)=>{return <Box sx={{display:"inline"}}>{name.User.firstName}{" "}{name.User.lastName} </Box>  })}</Typography>
    <Stack direction="row" spacing={1} sx={{marginTop:"10px"}}> 
    {type=="creator" || type=="collaborator" ?<Button onClick={()=>{handleClick()}}variant="contained"><CreateIcon/></Button>:null}
    {type=="creator"?<Button onClick={()=>{
      setOpenModal(true)
      console.log(collabId)
      setCurrentCollabId(collabId)}}variant="contained"><GroupIcon/></Button>:null}

  {type=="creator"  ?<Button  variant="contained" onClick={()=>{handleDelete()}}><DeleteIcon/></Button>:null}
      
  {type=="viewer"?<Button  variant="contained" sx={{background:indigo}} onClick={()=>{
    navigate('/dashboard/browse/collab') 
    setCurrentCollabId(collabId)}}>Read more</Button>:null}   
      </Stack>
  </Card>

 
    </>
  )
}

export default CollabCard
