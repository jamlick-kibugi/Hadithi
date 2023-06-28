import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../constants';
import { useAppContext } from '../context/appContext';
 
const CoverDetails = () => 
{

   
  const {handleChange,values} =useAppContext()
  
 
  return (<>

    <Box sx={{ width: '100%' }}>
     
    <Box sx={{display:"flex", flexDirection:"column",padding:"10px"}}>
    

   
    
   
    <Typography fontSize={"20px"}>Tell me a story about...</Typography>
    <TextField  name="content" values={values.content}  onChange={handleChange} placeholder="Eg.A girl who loves to skate..." sx={{marginBottom:"20px"}}></TextField>
 
    <Typography fontSize={"20px"}>Describe your main character...</Typography>
    <TextField name="character" values={values.character} onChange={handleChange} placeholder="Eg.purple hair, wears a floral dress, has  2 horns on her head..." sx={{marginBottom:"20px"}}></TextField>
    
    <Typography fontSize={"20px"}>Where does your story take place ?</Typography>
    <TextField name="location" values={values.location}  onChange={handleChange} placeholder="Eg.A magic castle in the middle of a forest" sx={{marginBottom:"20px"}}></TextField>
  

    

{/* <Button variant="contained" onClick={handleSubmit}>Submit </Button> */}
 
</Box>
</Box>

  </>)
}

export default CoverDetails
