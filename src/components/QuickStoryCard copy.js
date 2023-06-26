import React from 'react'
import { Box, TextField, Typography } from '@mui/material'
 
const QuickStoryCard = () => {
  return (<>
  <Box sx={{margin:"20px",display:"flex",flexDirection:"row",background:"black"}}>
    <Box  >
    <Box>
       <Typography>Quick story</Typography>
    </Box>
    </Box>
    <Box>
    Image
    </Box>
  </Box>
    </>
  
    
  )
}

export default QuickStoryCard
