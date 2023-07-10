import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constants'
import StoryCover from '../../components/StoryCover'
import { useAppContext } from '../../context/appContext'
 
const BrowsingPage = () => {

    const [storiesArray,setStoriesArray] =useState([])
    const{liked,setLiked}=useAppContext()



    useEffect(()=>{

        const story = axios.get(`${BACKEND_URL}/story`).then((res)=>{ 
            console.log(res.data)
            setStoriesArray(res.data)
             console.log(res.data[0].Likes)
            // console.log(res.data[0].id)
        })
          
        
      },[])



   
  return ( <>
    <Box sx={{background:"white",
    padding:"20px",borderRadius:"20px",  justifyContent:"space-around",
        columnGap:"20px",
        rowGap:"20px",
        margin:"40px auto",
        display: 'grid',    
        
      
       gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',background:"#f8fafc"}}>
      {storiesArray?.map((story,index)=>{      
        return <StoryCover key={index} title={story.title} image={story.coverUrl} storyId={story.id} like={story.Likes}/>  
       
      })}
    </Box>

    </>
  )
}

export default BrowsingPage
