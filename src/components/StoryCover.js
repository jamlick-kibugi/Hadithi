import React, { useEffect, useState } from 'react'
import { BackdropRoot, Box, Button, Card, CardActionArea, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
const indigo = "#4f46e5"
 
const StoryCover = ({title,image,storyId,like}) => {
   
const navigate=useNavigate()
const {currentStoryId,setCurrentStoryId,currentUserId} =useAppContext()
  

  const {setOption} = useAppContext()
  const [liked,setLiked]=useState(false)

  const setInitialLike = ()=>{    
    if(like.length>0 && like[0].userId == currentUserId ){
    setLiked(true)
    }
  }

  useEffect(()=>{
    setInitialLike()
  },[])


  

  
   


  // like.length>0 && like[0].userId == currentUserId
  return (<>
  <Card sx={{ width: "300px"}}>
    
      <CardActionArea sx={{background:"white", position:"relative"}}>
      <Button onClick={()=>{
        setLiked(!liked)
        if(like.length>0 && like[0].userId == currentUserId ){
          axios.delete(`${BACKEND_URL}/story/like/${storyId}/${currentUserId}`)
        }else
        axios.post(`${BACKEND_URL}/story/like/${storyId}/${currentUserId}`)}}
      sx={{position:"absolute",top:"10px",right:"10px"}} variant="contained">
        {liked  ? <FavoriteIcon/>:<FavoriteBorderIcon/>}
        </Button>
        <Button variant="contained">{like.length}</Button> 
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          
          <Button variant={"contained"}  onClickCapture={()=>{

          }} sx={{width:"100%",background:indigo}} onClick={()=>{
            setCurrentStoryId(storyId)
            navigate("/dashboard/story")}
          }>Read More</Button>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  
    
  )
}

export default StoryCover
