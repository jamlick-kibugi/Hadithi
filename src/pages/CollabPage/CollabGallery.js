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
 
const CollabGallery = () => {

    const{currentUserId,isEditing,setIsEditing,openModal,setOpenModal}=useAppContext()
    const [collabs,setCollabs] =useState([])
    const [shareCollabs,setShareCollabs] =useState([])

    useEffect(()=>{

    const getCollab=async()=>{
            const res= await axios.get(`${BACKEND_URL}/collab/userCollab/${currentUserId}`).then((res)=>{
                
                // console.log(res.data)
                setCollabs(res.data)
                 
            })
            

        }
        const getShareCollab=async()=>{
          const res= await axios.get(`${BACKEND_URL}/collab/userCollab/shareCollab/${currentUserId}`).then((res)=>{
              
              console.log(res.data[1])
              setShareCollabs(res.data)
               
          })
          

      }

    getCollab()
    getShareCollab()

  
    },[])

    



   
 

   
  return ( <>
    {openModal?<CollabModal/>:null}
    {isEditing==false ?
    <Box sx={{display:"flex",flexDirection:"column", background:"white",    
    padding:"20px",borderRadius:"20px", }}> 
    <Typography sx={{fontSize:"large",fontWeight:"bold"}}>My Collabs</Typography>
    <UserCollabGrid userId={currentUserId} type={"creator"}/>
    <Typography sx={{fontSize:"large",marginTop:"40px",fontWeight:"bold"}}>Shared Collabs</Typography>
     <SharedCollabGrid  userId={currentUserId}  type={"collaborator"}/>
    </Box>
    :null}
    

    {isEditing?   <Box sx={{background:"white",
    padding:"20px",borderRadius:"20px",  display:"flex",justifyContent:"center",width:"100%"}}>
        <CollabStoryForm/>
    </Box> :null}    


  

    </>
  )
}

export default CollabGallery
