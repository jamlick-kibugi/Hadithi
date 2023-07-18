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
 
 
 
const UserCollabGrid = ({userId}) => {

    const{currentUserId,isEditing,setIsEditing,openModal,setOpenModal}=useAppContext()
    const [collabs,setCollabs] =useState([])
    const [shareCollabs,setShareCollabs] =useState([])

    useEffect(()=>{

    const getCollab=async()=>{
            const res= await axios.get(`${BACKEND_URL}/collab/userCollab/${userId}`).then((res)=>{
                
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
  return (<>
    <Box sx={{        
        justifyContent:"space-around",
        columnGap:"20px",
        rowGap:"20px",
        margin:"40px auto",
        display: 'grid',  
        width:"100%",
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
        background:"#f8fafc"}}>
     
      {collabs?.length>0 && isEditing==false ? collabs.map((collab,index)=>{      
        return <CollabCard coverUrl={collab.coverUrl}  prompt={collab.prompt} collabId={collab.id} setIsEditing={setIsEditing}></CollabCard>}):null}
       
      
    </Box>
    </>
  )
}

export default UserCollabGrid
