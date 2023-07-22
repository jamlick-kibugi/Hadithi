import React, { useState } from 'react'
 
import { Box, Typography } from '@mui/material'
 
import CreateOptions from '../../components/CreateOptions'
import PersonalisedStoryForm from '../../components/PersonalisedStoryForm'
import CreateStory from '../../components/CreateStory'
import { useAppContext } from '../../context/appContext'
import CollabStoryForm from '../../components/CollabStoryForm'
 
const CreatePage = () => {
  const {option} = useAppContext()
 
  return (
    <Box sx={{background:"white",padding:"20px",borderRadius:"20px", justifyContent:"center",display:"flex",background:"#f8fafc"}}>
      {option==""?<CreateOptions  />:null}
      {option=="Stories"?<PersonalisedStoryForm/>:null}
      {option=="Collaborations"?<CollabStoryForm/>:null}
      {/* <PersonalisedStoryForm/> */}
      {/* <CreateStory/> */}
    </Box>
  )
}

export default CreatePage
