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
    name="genre"
    label="Genre"
    onChange={handleChange}
  >
    <MenuItem value={"Mystery"}>Mystery</MenuItem>
    <MenuItem value={"Adventure"}>Adventure</MenuItem>
    <MenuItem value={"FairyTale"}>Fairy Tale</MenuItem>
  </Select>
  </FormControl>

  <FormControl sx={{width:"33%"}}>
    <InputLabel id="demo-simple-select-label">Age</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.age}
    name="age"
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={2}>1-2</MenuItem>
    <MenuItem value={4}>3-4</MenuItem>
    <MenuItem value={6}>5-6</MenuItem>
    <MenuItem value={8}>7-8</MenuItem>
    <MenuItem value={10}>9-10</MenuItem>
  </Select>
  </FormControl>

  <FormControl sx={{width:"33%"}}>
    <InputLabel id="demo-simple-select-label">Style</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.age}
    label="Style"
    onChange={handleChange}
  >
    <MenuItem value={10}>Cartoon</MenuItem>
    <MenuItem value={20}>Fantasy</MenuItem>
    <MenuItem value={30}>Studio Ghibli</MenuItem>
    <MenuItem value={30}>van Gogh</MenuItem>
  </Select>
  </FormControl>
    </Box>
<Typography>Story Length</Typography>
    <Slider
  size="small"
  defaultValue={400}
  aria-label="Small"
  valueLabelDisplay="auto"
  min={200}
  max={1200}
/>
<Typography>No. of pages</Typography>
<Slider
  size="small"
  defaultValue={200}
  aria-label="Small"
  valueLabelDisplay="auto"
  min={3}
  max={1200}
/>


{/* <Button variant="contained" onClick={handleSubmit}>Submit </Button> */}
 
</Box>
</Box>

  </>)
}

export default StoryParameters
