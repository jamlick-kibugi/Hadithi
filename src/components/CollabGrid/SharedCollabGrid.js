import React from 'react'
import CollabCard from '../CollabCard'
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import  { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constants'
import StoryCover from '../../components/StoryCover'
import { useAppContext } from '../../context/appContext'
 
import CollabStoryForm from '../../components/CollabStoryForm'
import CollabModal from '../../components/CollabModal'
 
 
 
const SharedCollabGrid = ({userId,type}) => {

    const{currentUserId,isEditing,setIsEditing,openModal,setOpenModal}=useAppContext()
    const [collabs,setCollabs] =useState([])
    const [shareCollabs,setShareCollabs] =useState([])

    useEffect(()=>{

  
        const getShareCollab=async()=>{
          const res= await axios.get(`${BACKEND_URL}/collab/userCollab/shareCollab/${currentUserId}`).then((res)=>{
              
               console.log(res.data)
              setShareCollabs(res.data)
     
               
          })
          

      }

   
    getShareCollab()

  
    },[])
  return (<> 
  <Typography  sx={{fontSize:"15px",marginBottom:"10px",alignSelf:"flex-start"}}>{shareCollabs.length}{' '}{"Collaborations"}</Typography>
     
   
     
    <Box sx={{justifyContent:"space-around",
        columnGap:"20px",
        rowGap:"20px",
        margin:" auto",
        display: 'grid',  
        width:"100%",
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
        background:"#f8fafc"}}>{shareCollabs.length > 0 ? shareCollabs.map((collab,index)=>{      
        return    <CollabCard  type={type}  creatorId={collab.Collab.userId} name={[collab.User?.firstName,collab.User?.lastName]} coverUrl={collab.Collab.coverUrl}  prompt={collab.Collab.prompt} collabId={collab.Collab.id} setIsEditing={setIsEditing}></CollabCard>}) : null }
        </Box>
          
     
    </>
  )
}

export default SharedCollabGrid
