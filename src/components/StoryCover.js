import React from 'react'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const indigo = "#4f46e5"
 
const StoryCover = ({title,image,storyId}) => {
const navigate=useNavigate()
const {currentStoryId,setCurrentStoryId} =useAppContext()

  const {setOption} = useAppContext()
  return (<>
  <Card sx={{ width: "49%"}}>
    
      <CardActionArea sx={{background:"white", position:"relative"}}>
      <Button sx={{position:"absolute",top:"10px",right:"10px"}} variant="contained"><FavoriteBorderIcon/></Button>
       
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
