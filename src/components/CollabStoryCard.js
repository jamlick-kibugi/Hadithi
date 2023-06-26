import React from 'react'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, TextField, Typography } from '@mui/material'
const indigo = "#4f46e5"
const QuickStoryCard = ({title,image}) => {
  return (<>
  <Card sx={{ width: "49%"}}>
      <CardActionArea sx={{background:"white"}}>
       
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
          <Typography variant="body2" color="text.secondary" sx={{marginBottom:"20px"}}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Button variant={"contained"}   sx={{width:"100%",background:indigo}}>Create</Button>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  
    
  )
}

export default QuickStoryCard
