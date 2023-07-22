import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Fade from '@mui/material/Fade';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from '../context/appContext';
 

 
const CommentCard = ({currentUserId ,commentUserId,comment,commentId,commentThread,setCommentThread,createdAt,createdBy,activeComment,setActiveComment}) => {
    
   
  console.log(comment)
    const { sightingIndex } = useParams();
    const [isEditing,setIsEditing]= useState(false)
   const [creatorName,setCreatorName] =useState([])


    useEffect(()=>{
      const getCreatorName=async()=>{

        await axios.get(`${BACKEND_URL}/auth/users/${commentUserId}`).then((res)=>{
          setCreatorName([res.data[0]?.firstName,res.data[0]?.lastName])
           

          
        })

      }

     
      getCreatorName()
    },[])
    const handleSubmit=async (commentId)=>{
     
        const updatedComment = await axios.patch(`${BACKEND_URL}/story/page/comment/${commentId}`,{content:activeComment});

        setIsEditing(false)
        setActiveComment("")
        setCommentThread([...commentThread.filter((comment)=>{
           return  comment.id != commentId
        }),...updatedComment.data[1]])
      
    }

    const editComment = async(commentId)=>{
    setIsEditing(true) 
    const selectedComment = commentThread.find( (comment)=>comment.id === commentId)
    setActiveComment(selectedComment.content)
    } 

    const deleteComment = async(commentId)=>{

        console.log("delete comment")
  
        await axios.delete(`${BACKEND_URL}/story/page/comment/${commentId}`);
  
        setCommentThread(commentThread.filter((comment)=>{
           return  comment.id != commentId
        }))
   
        
      }
  
    
  return (<>
  <Box   display="flex" justifyContent="space-between"   gap="10px" backgroundColor="white" padding="30px" >
             
               <Stack direction="column" spacing={2} sx={{borderRadius:"10px",width:"100%" }}>
                <Stack direction="row" justifyContent={"space-between"}>
                 {isEditing?
                  <TextField sx={{flexGrow:1 ,marginRight:"40px"}} id="standard-basic" label="Comment" variant="standard" value={activeComment} onChange={(e)=>setActiveComment(e.target.value)}></TextField>
                  :<Box>{comment}</Box>}
                  {isEditing?<Button variant="contained" onClick={()=>handleSubmit(commentId)}>Save</Button>:null}
                  </Stack>             
                <Stack direction="row" justifyContent={"space-between"} sx={{ width:"100%"}} >
                 
               
                  
                  {commentUserId == currentUserId ?
                  <Box><Button onClick={()=>deleteComment(commentId)} ><DeleteIcon/></Button> 
                  <Button  onClick={()=>editComment(commentId)}  ><EditIcon/></Button> 
                  </Box> : <Box sx={{width:"50px"}}></Box>}
                  
                  <Box >
                  <Typography textAlign="right">{creatorName[0] }{" "} {creatorName[1]}</Typography>
                  <Typography textAlign="right">{createdAt}</Typography>
                  </Box>   
                  </Stack>     
 


               </Stack>
                
    </Box></>
    
  )
}

export default CommentCard
