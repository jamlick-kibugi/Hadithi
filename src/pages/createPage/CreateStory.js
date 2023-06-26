import React from 'react'
import CreateForm from '../../components/CreateForm'
import { Box, Typography } from '@mui/material'
import QuickStoryCard from '../../components/CollabStoryCard'

const CreatePage = () => {
  return (
    <Box sx={{background:"white",padding:"20px",borderRadius:"20px", display:"flex",alignItems:"center", flexDirection:"column",background:"#f8fafc"}}>
    <Typography textAlign="center" fontSize={"50px"} fontWeight={"bold"} textTransform={"uppercase"}>Create stories with the touch of a button</Typography>
    <Typography fontSize={"30px"} fontWeight={100}>Infinite worlds untold</Typography>
    <Box sx={{display:"flex",justifyContent : 'space-between', width:"80%"}}>
    <QuickStoryCard title={"Personalised Stories"} image={"/personalisedStory.png"}/>
    <QuickStoryCard title={"Collaborative Stories"} image={"/collaborativeStory.png"}/>
    </Box>
    </Box>
  )
}

export default CreatePage
