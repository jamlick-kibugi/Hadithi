import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../constants';
import { useAppContext } from '../context/appContext';
 
const StoryParameters = () => 
{

  const {values,handleChange} =useAppContext()

  const handleSubmit =async (e)=>{
    e.preventDefault()
    console.log("submit")

    let imageArray = []
    await axios.post(`${BACKEND_URL}/story`,values).then((res)=>{  
        
      let jsonData = res.data.imagePrompts.replace(/(\r\n|\n|\r)/gm, "")  
      jsonData =  jsonData.replace(/\\/g, "");  
     jsonData = jsonData.replace(/\[|\]/g, "");
     jsonData= jsonData.replace(/["]+/g, '')
    imageArray = jsonData.split(",") 
      
     const storyId = res.data.story.id
      const data ={storyId,imageArray}
      
    console.log(data)
    return data

     
      })
      .then((data)=>{
         console.log(data.storyId)
         console.log(data.imageArray[0])
        for(let i=0; i<imageArray.length ; i++ ){
          axios.post(`${BACKEND_URL}/story/image`,{imageDesc:data.imageArray[i],storyId:data.storyId}).then((res)=>{
            console.log(res.data)
          })
        }
         
      })
      
  }

 
  return (<>

    <Box sx={{ width: '100%' }}>
     
    <Box sx={{display:"flex", flexDirection:"column",padding:"10px"}}>
    

   

 
    <Box sx={{marginBottom:"20px", display:"flex",flexDirection:"row",justifyContent:"space-between"}} >
    <FormControl sx={{width:"33%"}}>
    <InputLabel id="demo-simple-select-label" >Genre</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.genre}
    name="genreId"
    label="Genre"
    onChange={handleChange}
  >
    <MenuItem value={1}>Fairytale</MenuItem>
    <MenuItem value={2}>Adventure</MenuItem>
    <MenuItem value={3}>Mystery</MenuItem>
    <MenuItem value={4}>Science Fiction</MenuItem>
    <MenuItem value={5}>Horror</MenuItem>
  </Select>
  </FormControl>

  <FormControl sx={{width:"33%"}}>
    <InputLabel id="demo-simple-select-label">Age</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.age}
    name="ageId"
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={1}>1-3</MenuItem>
    <MenuItem value={2}>3-6</MenuItem>
    <MenuItem value={3}>6-9</MenuItem>
    <MenuItem value={4}>9-12</MenuItem>
    <MenuItem value={5}>12-15</MenuItem>
  </Select>
  </FormControl>

  <FormControl sx={{width:"33%"}}>
    <InputLabel id="demo-simple-select-label">Style</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.style}
    label="Style"
    name="style"
    onChange={handleChange}
  >
    <MenuItem value={"Children's story book"}>Cartoon</MenuItem>
    <MenuItem value={"Horror movie"}>Fantasy</MenuItem>
    <MenuItem value={"Studio Ghibli"}>Studio Ghibli</MenuItem>
    <MenuItem value={"Van Gogh Painting"}>van Gogh</MenuItem>
  </Select>
  </FormControl>
    </Box>
<Typography>Story Length</Typography>
    <Slider
  size="small"
  name= "length"
  onChange={handleChange}
  defaultValue={values.length}
  step={100}
  aria-label="Small"
  valueLabelDisplay="auto"
  min={200}
  max={1200}
/>
<Typography>No. of pages</Typography>
<Slider
  size="small"
  onChange={handleChange}   
  value={values.numOfPages}
  name = "numOfPages"
  aria-label="Small"
  valueLabelDisplay="auto"
  step={1}
  min={3}
  max={5}
/>


{/* <Button variant="contained" onClick={handleSubmit}>Submit </Button> */}
 
</Box>
</Box>

  </>)
}

export default StoryParameters
