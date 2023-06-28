import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constants'
 
const BrowsingPage = () => {

    const [storiesArray,setStoriesArray] =useState([])



    useEffect(()=>{

        const story = axios.get(`${BACKEND_URL}/story`).then((res)=>{ 
            console.log(res.data)
            setStoriesArray(res.data)
        })
          
        
      },[])



   
  return ( <>
    <Box sx={{background:"white",padding:"20px",borderRadius:"20px", justifyContent:"center",display:"flex",background:"#f8fafc"}}>
      {storiesArray?.map((story,index)=>{        
       return <Box> <Typography>{story.title}</Typography>    
       <img key={index} src={story.coverUrl}></img> </Box>
      })}
    </Box>

    </>
  )
}

export default BrowsingPage
