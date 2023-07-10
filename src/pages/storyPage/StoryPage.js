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

const StoryPage = () => {

 
    const {currentStoryId,setCurrentStoryId,userName} =useAppContext()
 
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

    const handleSubmit =async(commentId)=>{
           console.log("hi")   

           setComment("")  
           const res = await axios.post(`${BACKEND_URL}/story/page/comment/${currentStoryId}`,{content:comment,createdBy:userName});
           setCommentThread([...commentThread,res.data]) 
   
    
      }



    
    useEffect(()=>{
        const getPages=async ()=>{
            await axios.get(`${BACKEND_URL}/story/page/${currentStoryId}/${pageNumber}/1`).then((res)=>{
                console.log(res.data)    
                // setPagesArray(res.data)
                setPage(res.data.rows[0])
                setPageLimit(res.data.count)
                setPrompt(res.data.rows[0].prompt)
                     
               
            })          
             

        }
        const getComments = async()=>{
            await axios.get(`${BACKEND_URL}/story/page/comment/${currentStoryId}`).then((res)=>{                
                setCommentThread(res.data)
            })

        }
        getPages()
        getComments()
        


    },[pageNumber])


  return (<>
   <Box sx={{background:"white",padding:"20px",borderRadius:"20px", alignItems:"center",display:"flex",flexDirection:"column",background:"#f8fafc"}}>
   
 
     {page!==null ?  
        <Card  sx={{display:"grid",gridTemplateColumns: 'repeat(2, 1fr)',spacing:2,height:"400px",width:"50%"}}>
        <Box sx={{position:"relative"}}>
        <CardMedia
          component="img"   
          image={page.pageUrl}
          alt="green iguana"
           
        /> {showPrompt ? 
        <Box sx={{padding:"10px",position:"absolute",bottom:0 ,background:"white",opacity:0.5 }}>
       <Typography  fontSize={"8px"}>{prompt}</Typography>
        </Box> : null}
        </Box>
        <CardContent sx={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <Typography fontSize={"15px"}>{page.pageContent}</Typography>
            <Box onClick= {()=>{setShowPrompt(!showPrompt)}}sx={{display:"flex",justifyContent:"flex-end"}}>   <Button >{showPrompt==true? <VisibilityOffIcon/>: <RemoveRedEyeIcon/>}</Button> </Box>
        </CardContent>      
       

        </Card> 
    : null }  
 
    <Box sx={{display:"flex",justifyContent:"space-between",marginTop:"10px", width:"50%"}}>
    <Button variant="contained"  sx={{background:indigo}} disabled={pageNumber==0}onClick={decrementPage}>Previous</Button>        
    <Button variant="contained"  sx={{background:indigo}}  disabled={pageNumber==pageLimit-1}  onClick={incrementPage}>Next</Button>
    </Box>


    {/*Comment Box*/}  
    <Box sx={{width:"50%",mt:"40px"}}>

    <Box display="flex" justifyContent="space-between" sx={{width:"100%", backgroundColor:"white"}} >

    <TextField sx={{flexGrow: 1 ,marginRight:"10px"}}value={comment} onChange={(e)=>setComment(e.target.value)}/>
    <Button variant="contained" onClick={()=>handleSubmit()}>Comment</Button>
    </Box>   

    <Box   display="grid"  gap="20px" width="100%" mt="40px" sx={{ padding:5  }}>

    {commentThread.length> 0 ?  commentThread.map((comment,index)=>{
                return <CommentCard 
                key={index} 
                setCommentThread={setCommentThread} 
                commentThread={commentThread} 
                comment={comment.content} 
                createdAt={comment.createdAt}
                createdBy={comment.createdBy}
                commentId={comment.id}
                activeComment={activeComment}
                setActiveComment={setActiveComment} />}
                
    ): null}
    </Box>

       
    </Box>
    </Box>


   </>
  )
}

export default StoryPage
