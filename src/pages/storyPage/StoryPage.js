import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../constants'
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useAppContext } from '../../context/appContext'
import StoryContent from '../../components/StoryContent'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const indigo = "#4f46e5"

const StoryPage = () => {

 
    const {currentStoryId,setCurrentStoryId} =useAppContext()

    // const values ={
    //     pageContent:"",
    //     pageUrl:"",
    //     prompt:"",
    // }
    // const [storyContent,setStoryContent] =useState(values)

    // const [pagesArray,setPagesArray] =useState([])
    const [pageNumber,setPageNumber] =useState(0)
    const [pageLimit,setPageLimit]=useState(0)
    const [page,setPage] =useState(null)
    const [prompt,setPrompt] = useState("")
    const [showPrompt,setShowPrompt] =useState(false)

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
            await axios.get(`${BACKEND_URL}/story/page/${currentStoryId}/${pageNumber}/1`).then((res)=>{
                console.log(res.data)    
                // setPagesArray(res.data)
                setPage(res.data.rows[0])
                setPageLimit(res.data.count)
                setPrompt(res.data.rows[0].prompt)
            //     setStoryContent({...storyContent,pageContent:res.data[1].pageContent,
            //     pageUrl:res.data[1].pageUrl,
            // prompt:res.data[1].prompt})            
               
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


         
        
     
     
   
   
       
    </Box>


   </>
  )
}

export default StoryPage
