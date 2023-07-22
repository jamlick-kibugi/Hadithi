import React, { useEffect, useState } from 'react'
import StoryCover from '../StoryCover'
import axios from 'axios'
import { BACKEND_URL } from '../../constants'
import { Box, Button, Pagination, Stack, Typography } from '@mui/material'
import { useAppContext } from '../../context/appContext'
 
const StoryGrid = ({userId,type}) => {

    const [storiesArray,setStoriesArray] = useState([])
    const {currentUserId} = useAppContext()
    const [pageCount,setPageCount] = useState("")
    const [pageNumber,setPageNumber] = useState(1)
    const [resultCount,setResultCount] =useState("")

    useEffect(()=>{
        const getStories=async ()=>{
            // const story = axios.get(`${BACKEND_URL}/story/${pageNumber-1}/6/?ageId=${values.ageId}&genreId=${values.genreId}&searchText=${values.searchText}`).then((res)=>{ 
            await axios.get(`${BACKEND_URL}/story/${userId}/${pageNumber-1}/6`).then((res)=>{
                 console.log(res.data)
                 setStoriesArray(res.data?.allStory.rows)
                 setResultCount(res.data?.allStory.count)
                 setPageCount(Math.ceil(res.data?.pageCount))
                //  setResultCount(res.data?.count)
            })          
         }

        getStories()
    
    
    },[pageNumber])

 
        
        

  return (<>
    <Typography  sx={{fontSize:"20px",marginBottom:"10px",alignSelf:"flex-start"}}>{resultCount}{' '}{"Stories"}</Typography>
    <Box sx={{  
        columnGap:"20px",
        rowGap:"20px",
        margin:" auto",
        display: 'grid',  
        width:"90%",
        justifyContent:"space-around",
  
       gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))' }}>

      {storiesArray?.map((story,index)=>{      
        return <StoryCover storiesArray={storiesArray} setStoriesArray={setStoriesArray} type={type} key={index} genreId={story.genreId} ageId={story.ageId} createdBy={story?.User} title={story.title} image={story.coverUrl} storyId={story.id} like={story.Likes}/>  
       
      })}

     
 
    </Box>

    <Stack spacing={2} sx={{alignContent:"center" ,marginTop:"40px",marginBottom:"40px"}}>
      <Pagination onChange={(e,value)=>{setPageNumber(value)}} count={pageCount} variant="outlined" shape="rounded" />
    </Stack>

    </>
  )
}

export default StoryGrid
