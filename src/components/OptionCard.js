import React from 'react'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import { useAppContext } from '../context/appContext'
import axios from 'axios'
import { BACKEND_URL } from '../constants'
const indigo = "#4f46e5"
 
 
const OptionCard = ({title,image}) => {

  const {setOption,currentUserId,setCurrentCollabId,isLoading,setIsLoading} = useAppContext()
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
          <Button variant={"contained"}   sx={{width:"100%",background:indigo}} onClick={async()=> {
            if (title == "Personalised Stories"){
              setOption(title)}
              else{
                setOption(title)
                setIsLoading(true)

                const createCollab =async()=>{
                  const res =  await axios.post(`${BACKEND_URL}/collab`,{currentUserId:currentUserId}).then((res)=>{
                    setCurrentCollabId(res.data.id)
                    setIsLoading(false)
                  });

                  
                 


                }
                createCollab()
                
              }
            }
            
          }>Create</Button>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  
    
  )
}

export default OptionCard
