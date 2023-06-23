import React from 'react'
import { Box, TextField } from '@mui/material'
 
const CollabStory = () => {
  return (<>
  <Box sx={{margin:"20px",display:"flex",flexDirection:"row"}}>
    <Box>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
    </Box>
    <Box>
    Image
    </Box>
  </Box>
    </>
  
    
  )
}

export default CollabStory
