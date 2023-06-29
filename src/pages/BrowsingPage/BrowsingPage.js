import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constants'
import StoryCover from '../../components/StoryCover'
 
const BrowsingPage = () => {

    const [storiesArray,setStoriesArray] =useState([])



    useEffect(()=>{

        const story = axios.get(`${BACKEND_URL}/story`).then((res)=>{ 
            console.log(res.data)
            setStoriesArray(res.data)
            // console.log(res.data[0].id)
        })
          
        
      },[])



   
  return ( <>
    <Box sx={{background:"white",padding:"20px",borderRadius:"20px", justifyContent:"center",display:"flex",background:"#f8fafc"}}>
      {storiesArray?.map((story,index)=>{      
        return <StoryCover key={index} title={story.title} image={story.coverUrl} storyId={story.id}/>  
       
      })}
    </Box>

    </>
  )
}

export default BrowsingPage
