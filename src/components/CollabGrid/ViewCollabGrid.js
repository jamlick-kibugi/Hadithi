import React from 'react'
import CollabCard from '../CollabCard'
import { Box, Typography } from '@mui/material'
import axios from 'axios'
import  { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constants'
import StoryCover from '../StoryCover'
import { useAppContext } from '../../context/appContext'
 
import CollabStoryForm from '../CollabStoryForm'
import CollabModal from '../CollabModal'
 
 
 
const ViewCollabGrid = ({userId,type}) => {

    const{currentUserId,isEditing,setIsEditing,openModal,setOpenModal}=useAppContext()
    const [collabs,setCollabs] =useState([])
    const [shareCollabs,setShareCollabs] =useState([])

    useEffect(()=>{

    const getCollab=async()=>{
            const res= await axios.get(`${BACKEND_URL}/collab/userCollab`).then((res)=>{
                
              
                setCollabs(res.data)
                 console.log(res.data)
                 
            })
            

        }
        const getShareCollab=async()=>{
          const res= await axios.get(`${BACKEND_URL}/collab/userCollab/shareCollab/${currentUserId}`).then((res)=>{
              
               
              setShareCollabs(res.data)
     
               
          })
          

      }

    getCollab()
    getShareCollab()

  
    },[])
  return (<> 
  <Typography  sx={{fontSize:"15px",marginBottom:"10px",alignSelf:"flex-start"}}>{collabs.length}{' '}{"Collaborations"}</Typography>
    
     <Box sx={{justifyContent:"space-around",
        columnGap:"20px",
        rowGap:"20px",
        margin:" auto",
        display: 'grid',  
        width:"100%",
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
        background:"#f8fafc"}}> {collabs?.length>0 && isEditing==false ? collabs.map((collab,index)=>{      
        return <CollabCard setCollabs={setCollabs} collabs={collabs} type={type}  creatorId={collab.User?.id} name={[collab.User?.firstName,collab.User?.lastName]} coverUrl={collab.coverUrl}  prompt={collab.prompt} collabId={collab.id} setIsEditing={setIsEditing}></CollabCard>}):null}
       </Box>
      
 
    </>
  )
}

export default ViewCollabGrid
