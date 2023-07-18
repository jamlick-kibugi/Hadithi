import React, { useEffect, useState } from 'react'
import { BackdropRoot, Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import {saveAs} from "file-saver";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
 
const indigo = "#4f46e5"
 
const IllustrationCard = ({type,url,currentIllustrationId,illustrations,setIllustrations}) => {

  const handleClick = (url)=>{   
    console.log(url)  
    saveAs(url, "Image");
   }


  const handleDelete =()=>{
    axios.delete(`${BACKEND_URL}/story/illustration/${currentIllustrationId}`)
    const newIllustrations = illustrations.filter((illustration)=>{
      return illustration.id !== currentIllustrationId
    })
    setIllustrations(newIllustrations)
  }

    return(<>

  <Card sx={{ width: "200px", height:"200px",position:"relative"}}>
    
       
      
        <CardMedia
          component="img"
          height="300"
          image={url}
          alt="green iguana"
        />
    {type=="delete" ?             
      <IconButton   onClick={()=>{handleClick(url)}} variant="contained"   sx={{
    width: 25 ,
    height: 25,
    borderRadius: 1,
     
    background:"rgba(0,0,0,0.7)",
    position:"absolute",
    bottom:10,
    right:10
  }}><DownloadIcon sx={{fontSize:"15px", color:"white"}}/></IconButton>:null}
 {type=="delete" ?           
<IconButton   onClick={()=>{handleDelete()}} variant="contained"   sx={{
    width: 25 ,
    height: 25,
    borderRadius: 1,
     
    background:"rgba(0,0,0,0.7)",
    position:"absolute",
    top:10,
    right:10
  }}><DeleteIcon sx={{fontSize:"15px", color:"white"}}/></IconButton>:null}
       
      
      
    </Card>
    </>
  
    
  )
}

export default IllustrationCard
