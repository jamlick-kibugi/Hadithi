import { Box, Typography } from '@mui/material'
import React from 'react'
import OptionCard from './OptionCard'
 
const CreateOptions = ( ) => {
  return (
    <Box sx={{width:"100%", display:"flex",flexDirection:"column",justifyContent:"center"}}>
     <Typography textAlign="center" fontSize={"50px"} fontWeight={"bold"} textTransform={"uppercase"}>Create stories with the touch of a button</Typography>
    <Typography textAlign="center" fontSize={"30px"} fontWeight={100} marginBottom={"20px"}>Infinite possibilities</Typography>
    <Box sx={{display:"flex",justifyContent : 'space-between', width:"100%"}}>
    <OptionCard title={"Personalised Stories"} image={"/personalisedStory.png"}  content={"Quick stories with a few simple prompts"} />
    <OptionCard title={"Collaborative Stories"} image={"/collaborativeStory.png"} content={"Collaborate with friends, and build a world together"}  />
    </Box>
    </Box>
  )
}

export default CreateOptions
