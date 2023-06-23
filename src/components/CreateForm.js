import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../constants';

const CreateForm = () => {
  let initialValues = {
    content:"write a story about a girl who goes on a trip to the moon",
    character:"A girl with red hair and angel wings",
    location:"in a futuristic space hub",
    genre:"none",
    age: "4",
  }

  const [values,setValues]= useState(initialValues)
  const [imageArray,setImageArray]=useState([])

 
  const handleChange = (event) => {
    // setGenre(event.target.value);
  };

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
  return (
  <Box sx={{display:"flex", flexDirection:"column",padding:"10px"}}>
    

   

    <TextField placeholder="Tell me a story about" sx={{marginBottom:"20px"}}></TextField>
    <FormControl sx={{marginBottom:"20px"}} >
    <InputLabel id="demo-simple-select-label" >Genre</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.genre}
    label="Genre"
    onChange={handleChange}
  >
    <MenuItem value={10}>Mystery</MenuItem>
    <MenuItem value={20}>Adventure</MenuItem>
    <MenuItem value={30}>Fairy Tale</MenuItem>
  </Select>
    </FormControl>

    <FormControl sx={{marginBottom:"20px"}}>
    <InputLabel id="demo-simple-select-label">Age</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>1-2</MenuItem>
    <MenuItem value={20}>3-4</MenuItem>
    <MenuItem value={30}>5-6</MenuItem>
  </Select>
    </FormControl>

    <Slider
  size="small"
  defaultValue={70}
  aria-label="Small"
  valueLabelDisplay="auto"
/>

<Button variant="contained" onClick={handleSubmit}>Submit </Button>
 
 <Box>

 </Box>
  </Box>


  )
}

export default CreateForm 
