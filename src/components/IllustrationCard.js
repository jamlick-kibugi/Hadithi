import React, { useEffect, useState } from 'react'
import { BackdropRoot, Box, Button, Card, CardActionArea, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
const indigo = "#4f46e5"
 
const IllustrationCard = ({url}) => {

    return(<>

  <Card sx={{ width: "300px"}}>
    
      <CardActionArea sx={{background:"white", position:"relative"}}>
      
        <CardMedia
          component="img"
          height="300"
          image={url}
          alt="green iguana"
        />
        <CardContent>          
           
          
     
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  
    
  )
}

export default IllustrationCard
