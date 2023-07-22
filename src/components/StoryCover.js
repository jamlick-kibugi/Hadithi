import React, { useEffect, useState } from 'react'
import { BackdropRoot, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Stack, TextField, Typography } from '@mui/material'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import DeleteIcon from '@mui/icons-material/Delete';
 
const indigo = "#4f46e5"
 
const StoryCover = ({ index,title,pageNumber,image,storyId,like,createdBy,genreId,ageId,type,storiesArray,setStoriesArray}) => {

const genre = ['Fairytale', 'Adventure', 'Mystery', 'Science-fiction', 'Horror']
const age =['1-3','3-6','6-9','9-12','12-15']

 
const [userLike,setUserLike]=useState([])

   
const navigate=useNavigate()
const {currentStoryId,setCurrentStoryId,currentUserId} =useAppContext()
 
  const {setOption,trigger,setTrigger} = useAppContext()
  const [liked,setLiked]=useState(false)
   


  const [likeCount,setLikeCount] =useState(like.length)
 
   
   
  
 
  
  useEffect(()=>{
     

    const setInitialLike = ()=>{    

      if (like.length >0){
        setLiked(true)
      }
      
    }
     
    setInitialLike()
     
  },[])


  

  
   


  // like.length>0 && like[0].userId == currentUserId
  return (<>
  <Card sx={{ width: "250px"}}>
    
      <CardActionArea sx={{background:"white"  }}>
        {/*FOR JUST VIEW*/}
 

        {/*FOR LIKING STORY*/}
       {type=="like"?
      <Button onClick={()=>{
        console.log("h0")
        setLiked(!liked)  
       
        if(liked){
          axios.delete(`${BACKEND_URL}/story/like/${storyId}/${currentUserId}`)
          let items = [...storiesArray];
          let item = {...storiesArray[index]};
          item.Likes = [];
          console.log(item.Likes.length)
          items[index] = item;
          setStoriesArray(items);
          
        }else{            
        axios.post(`${BACKEND_URL}/story/like/${storyId}/${currentUserId}`)
        let items = [...storiesArray];
          let item = {...storiesArray[index]};
          item.Likes = [0];
          items[index] = item;
          console.log(item.Likes.length)
          setStoriesArray(items);
          setLiked(true)  
         
         }
  
      
      }
      
      }
        
      sx={{position:"absolute",top:"10px",right:"10px"}} variant="contained">
        {liked ? <FavoriteIcon/>:<FavoriteBorderIcon/>}
        </Button>:null}

      {/*FOR DELETING STORY*/}
        {type=="delete"?
      <Button onClick={()=>{
         
          axios.delete(`${BACKEND_URL}/story/${storyId}`)
          const newStories = storiesArray.filter((story)=>{
            return story.id !== storyId
          })

          setStoriesArray(newStories)
        
        }}
         
        
        
      sx={{position:"absolute",top:"10px",right:"10px"}} variant="contained">
          <DeleteIcon/>
        </Button>:null}
       
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography>{like.length}</Typography>
          <Typography>{liked}</Typography>
          <Typography fontWeight={"bold"}gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Stack direction="column" spacing={2} marginBottom="20px">
          <Typography sx={{textTransform:"capitalize"}}>Created by: {createdBy.firstName}{' '}{createdBy.lastName} </Typography>
          <Typography>Genre:{' '}<Chip label={genre[genreId-1]} /></Typography>   
          <Typography>Age:{' '}<Chip label={age[ageId-1]} /> </Typography>
          </Stack>
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
