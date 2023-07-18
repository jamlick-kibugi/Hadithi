import { Box, Button, Pagination, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constants'
import StoryCover from '../../components/StoryCover'
import { useAppContext } from '../../context/appContext'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
 
const BrowsingPage = () => {

    const [storiesArray,setStoriesArray] =useState([])
    const{currentUserId,trigger,setTrigger}=useAppContext()
    const [usersArray,setUsersArray] =useState([])
    const [age, setAge] =useState("")
    const [genre, setGenre] =useState("")
    const [pageCount,setPageCount]=useState("")
    const [resultsLength,setResultsLength]= useState("")
    const [pageNumber,setPageNumber] =useState(1)
    const [likeArray,setLikeArray] =useState([])

    const searchValues={
      ageId:"all",
      genreId:"all",
      searchText:"",
    }
    const [values,setValues] =useState(searchValues)
    const handleChange = (e) => {
      setValues({...values,[e.target.name]:e.target.value});
    };

    const clearFilters =(e)=>{
      setValues({ ageId:"all",
      genreId:"all",
      searchText:""});

    }



    useEffect(()=>{
        console.log("getting stories")

        const story = axios.get(`${BACKEND_URL}/story/${pageNumber-1}/1/?ageId=${values.ageId}&genreId=${values.genreId}&searchText=${values.searchText}`).then((res)=>{ 
            console.log(res.data)
            setStoriesArray(res.data.allStory)
            setUsersArray(res.data?.allStory.User)
            setPageCount(res.data?.pageCount)
            setResultsLength(res.data?.contentLength)
            
           
        })
          
        
      },[values,pageNumber,trigger])



   
  return ( <>
  
 
  <Box sx={{background:"white",
     borderRadius:"20px",display:"flex",flexDirection:"column",alignItems:"center",border:2}}>
  <Box sx={{width:"80%",marginTop:"40px",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Box sx={{display:'flex',justifyContent:"space-between",width:"100%"}}>
       <Typography fontSize={"20px"}>{resultsLength}{' '}{"results"}</Typography>
    <Stack direction={"row"} spacing={2}>
        <FormControl sx={{width:"200px"}}>
          <TextField name='searchText' value={values.searchText} onChange={(e)=>{handleChange(e)}}/>
        </FormControl>
       <FormControl  sx={{width:"80px"}} >

      
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.ageId}
              label="Age"
              name="ageId"
              onChange={handleChange}
               
            >
              <MenuItem value={1}>1-3</MenuItem>
              <MenuItem value={2}>3-6</MenuItem>
              <MenuItem value={3}>6-9</MenuItem>
              <MenuItem value={4}>9-12</MenuItem>
              <MenuItem value={5}>12-15</MenuItem>
            </Select>
       
      </FormControl >

      <FormControl sx={{width:"80px"}}   >
      <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select 
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.genreId}
              label="genre"
              name="genreId"
              onChange={handleChange}
             
              
            >
              <MenuItem value={1}>Fairytale</MenuItem>
              <MenuItem value={2}>Adventure</MenuItem>
              <MenuItem value={3}>Mystery</MenuItem>
              <MenuItem value={4}>Science fiction</MenuItem>
              <MenuItem value={5}>Horror</MenuItem>
            </Select>
       </FormControl>

       <Button variant="contained" onClick={()=>{clearFilters()}}>Clear Filters</Button>
        
       </Stack>
      </Box>


    <Box sx={{  
        columnGap:"10px",
        rowGap:"20px",
        margin:"40px auto",
        display: 'grid',  
        width:"100%",
       gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))' }}>

      {storiesArray?.map((story,index)=>{      
        return <StoryCover index={index} setStoriesArray={setStoriesArray} storiesArray={storiesArray} pageNumber={pageNumber} type={"like"} key={index} genreId={story.genreId} ageId={story.ageId} createdBy={story?.User} title={story.title} image={story.coverUrl} storyId={story.id} like={story.Likes}/>  
       
      })}

     
 
    </Box>
      
    <Stack spacing={2} sx={{alignContent:"center" ,marginBottom:"40px"}}>
      <Pagination onChange={(e,value)=>{setPageNumber(value)}} count={pageCount} variant="outlined" shape="rounded" />
    </Stack>
    </Box>
    </Box>

    </>
  )
}

export default BrowsingPage
