import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../constants'
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import { useAppContext } from '../../context/appContext'
import StoryContent from '../../components/StoryContent'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CommentCard from '../../components/CommentCard'
 
const indigo = "#4f46e5"

const CollabViewPage = () => {

 
    const {currentStoryId,setCurrentStoryId,userName,currentUserId,currentCollabId} =useAppContext()
 
    const [pageNumber,setPageNumber] =useState(0)
    const [pageLimit,setPageLimit]=useState(0)
    const [page,setPage] =useState(null)
    const [prompt,setPrompt] = useState("")
    const [showPrompt,setShowPrompt] =useState(false)
    const [comment,setComment]=useState("")
    const [commentThread,setCommentThread]=useState([])
    const [activeComment,setActiveComment]= useState("")
    

    const incrementPage = ()=>{
        if(pageNumber == pageLimit-1 ){
            return
        }else{
            setPageNumber(pageNumber + 1)
        }
        
    }

    const decrementPage = ()=>{
        if (pageNumber == 0){
            setPageNumber(0)
        }else{
        setPageNumber(pageNumber - 1)
        }
    }

   



    
    useEffect(()=>{
        const getPages=async ()=>{
            await axios.get(`${BACKEND_URL}/collab/userCollab/pages/${currentCollabId} `).then((res)=>{
                console.log(res.data)    
              
                setPage(res.data[pageNumber])
                setPageLimit(res.data.length)
                // setPrompt(res.data.rows[0].prompt)
                     
               
            })          
             

        }
         
        getPages()
        
        


    },[pageNumber])


  return (<>
   <Box sx={{background:"white",padding:"20px",borderRadius:"20px", alignItems:"center",display:"flex",flexDirection:"column",background:"#f8fafc"}}>
   
 
     {page!==null ?  
        <Card  sx={{display:"grid",gridTemplateColumns: 'repeat(2, 1fr)',spacing:2,height:"400px",width:"50%"}}>
        <Box sx={{position:"relative"}}>
             
        <CardMedia
          component="img"   
          image={page.pageUrl}
          width={"100%"} 
          height="100%"
           
        /> 
        </Box>
        <CardContent sx={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <Typography fontSize={"15px"}>{page.pageContent}</Typography>
             
        </CardContent>      
       

        </Card> 
    : null }  
 
    <Box sx={{display:"flex",justifyContent:"space-between",marginTop:"10px", width:"50%"}}>
    <Button variant="contained"  sx={{background:indigo}} disabled={pageNumber==0}onClick={decrementPage}>Previous</Button>        
    <Button variant="contained"  sx={{background:indigo}}  disabled={pageNumber==pageLimit-1}  onClick={incrementPage}>Next</Button>
    </Box>


     
    </Box>


   </>
  )
}

export default CollabViewPage
