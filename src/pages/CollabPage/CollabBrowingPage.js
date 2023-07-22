import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constants'
import StoryCover from '../../components/StoryCover'
import { useAppContext } from '../../context/appContext'
import CollabCard from '../../components/CollabCard'
import CollabStoryForm from '../../components/CollabStoryForm'
import CollabModal from '../../components/CollabModal'
import UserCollabGrid from '../../components/CollabGrid/UserCollabGrid'
import SharedCollabGrid from '../../components/CollabGrid/SharedCollabGrid'
import ViewCollabGrid from '../../components/CollabGrid/ViewCollabGrid'
const indigo = "#4f46e5"
const CollabBrowsingPage = () => {

    const{currentUserId,isEditing,setIsEditing,openModal,setOpenModal}=useAppContext()
    const [collabs,setCollabs] =useState([])
    const [shareCollabs,setShareCollabs] =useState([])
 

    



   
 

   
  return ( <>
     
    
    <Box sx={{display:"flex",flexDirection:"column", background:"white",    
    padding:"20px",borderRadius:"20px", }}> 
    <ViewCollabGrid type="viewer"/>
    </Box>
   
    
 

  

    </>
  )
}

export default CollabBrowsingPage
