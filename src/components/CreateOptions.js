import { Box, Typography } from '@mui/material'
import React from 'react'
import OptionCard from './OptionCard'
 
const CreateOptions = ( ) => {
  return (
    <Box sx={{width:"100%", display:"flex",flexDirection:"column",justifyContent:"center"}}>
     <Typography textAlign="center" fontSize={"50px"} fontWeight={"bold"} textTransform={"uppercase"}>Create stories with the touch of a button</Typography>
    <Typography textAlign="center" fontSize={"30px"} fontWeight={100}>Infinite worlds untold</Typography>
    <Box sx={{display:"flex",justifyContent : 'space-between', width:"100%"}}>
    <OptionCard title={"Personalised Stories"} image={"/personalisedStory.png"}  />
    <OptionCard title={"Collaborative Stories"} image={"/collaborativeStory.png"}  />
    </Box>
    </Box>
  )
}

export default CreateOptions
