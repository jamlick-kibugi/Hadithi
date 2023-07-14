import { Box, Button, Card, CardContent, CardMedia, CircularProgress, TextField, TextareaAutosize, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { BACKEND_URL } from '../constants'
import Textarea from '@mui/joy/Textarea';
import createCollabImage from '../utils/createCollabImage';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
 
const CollabPage = ({collabPageId,pages,setPages,content,image}) => {

  console.log(content)

  const [pageContent,setPageContent] =useState(content)
  const [pageUrl,setPageUrl] =useState(image)
  const [isLoading,setIsLoading] = useState(false)

  const createPageImage=()=>{
    setIsLoading(true)
    console.log("create Page Image")
    //only generate the image URL doesnt  update the page 
    const generateImage=async()=>{      

      const res = await axios.post(`${BACKEND_URL}/collab/page/image`,{prompt:pageContent}).then((res)=>{
        // stores replicate link in firebase, and returns image URL
        createCollabImage(res.data,collabPageId,setPageUrl,setIsLoading)
        
      })

     
      
    }

   generateImage()
    
   


    
  }
  const deletePage=async()=>{
    console.log(pages)
    console.log(collabPageId)
    
 

    axios.delete(`${BACKEND_URL}/collab/page/${collabPageId}`)
    
    const newPages = pages.filter((page)=>{
      return page.id !== collabPageId
    })

    console.log( newPages)

    setPages(newPages)
    
   
    
  }

  const handleChange=(e)=>{

    const editContent =(pageContent)=>{
      axios.patch(`${BACKEND_URL}/collab/page`,{collabPageId:collabPageId,pageContent:pageContent})
    }
    setPageContent(e.target.value)

    editContent(e.target.value)

  }
  return (<>
    <Card  sx={{display:"grid",gridTemplateColumns: 'repeat(2, 1fr)',spacing:2,  width:"100%",border:2 }}>
     <CardContent sx={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
     <textarea style={{height:"100%"}} value={pageContent} onChange={(e)=>{handleChange(e)}}></textarea>
    </CardContent>      
   
    <Box sx={{position:"relative"}}>
    {isLoading?<Box sx={{display:"flex",justifyContent:"center",alignItems:"center", height:"300px" }}> <CircularProgress/> </Box>:<CardMedia
      component="img"   
      image={pageUrl}
      alt="green iguana"
      height="100%"
      sx={{position:"relative", height:"300px" }}
    
    />}
       <Button onClick={()=>{deletePage()}} sx={{position:"absolute", top:0,right:0,margin:1}}variant="contained"><DeleteIcon/></Button> 
       <Button onClick = {()=>{createPageImage()}}sx={{position:"absolute", bottom:0,right:0,margin:1}}variant="contained"><AutoAwesomeIcon/></Button> 
   
    </Box>

    

    </Card> 
   
    </>
   
  )
}

export default CollabPage
