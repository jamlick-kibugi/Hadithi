import { Box, Button, Card, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../constants'
import { useAppContext } from '../context/appContext'
import CollabPage from './CollabPage'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import createCollabCover from '../utils/createCollabCover'
import CollabModal from './CollabModal'
 
const CollabStoryForm = () => {
    const {currentCollabId,isLoading,setIsLoading} =useAppContext()

    
    const [collab,setCollab] =useState({})
    const [guide,setGuide] = useState([])
    const [pages,setPages] =useState([])
    const [coverImage,setCoverImage]=useState("")
    const[isCoverLoading,setIsCoverloading]=useState(false)
    const [coverPrompt,setCoverPrompt] = useState("")
    function splitParagraph(paragraph) {
        var sentences = paragraph.split('?');
        return sentences;
      }

   

    const addPage=async()=>{
      const page = await axios.post(`${BACKEND_URL}/collab/page`,{currentCollabId:currentCollabId})
      setPages([...pages,page.data])
      console.log(page.data)
    }
    useEffect(()=>{

        const getCollab=async()=>{
            const res= await axios.get(`${BACKEND_URL}/collab/${currentCollabId}`).then((res)=>{
                setCollab(res.data[0])
                console.log(res.data[0])
                setGuide(splitParagraph(res.data[0].guide))
                setCoverImage(res.data[0].coverUrl)
                 
                 

            })
            

        }

        const getCollabPages=async()=>{
          const res= await axios.get(`${BACKEND_URL}/collab/userCollab/pages/${currentCollabId}`).then((res)=>{
              setPages(res.data)
          })
          

      }



        if(currentCollabId){
            getCollab()
            getCollabPages()
        }

        
      
  
    },[currentCollabId])

    const handleSubmit=()=>{
      setIsCoverloading(true)

      const generateCoverImage= async()=>{
        const res = await axios.post(`${BACKEND_URL}/collab/page/coverImage`,{prompt:coverPrompt}).then((res)=>{
          console.log(res.data)
          createCollabCover(res.data,currentCollabId,setCoverImage,setIsCoverloading)
        })
      }

      generateCoverImage()
      
    }

    let [guideNumber,setGuideNumber] =useState(0)

  const incrementNumber =()=>{   
    if (guideNumber >= guide.length -2){
      setGuideNumber(0)
   
    } else{
      setGuideNumber(guideNumber + 1)
      

    }
  }
  const decrementNumber =()=>{
    if(guideNumber > 0){
    setGuideNumber(guideNumber -1 )
    }else{
      setGuideNumber(guide.length -2 )
    }
     
  }
  return (<>


  <Box width="80%"  >
    {isLoading? <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}><CircularProgress/> <Typography sx={{marginTop:"20px"}}>Creating collaborative story</Typography></Box> :
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center" }}>
        <Typography textAlign={"center"} fontSize={"30px"}  >Write a story about... </Typography>
    <Typography textAlign={"center"} fontSize={"25px"}>{collab.prompt}</Typography> 

    <Typography sx={{marginTop:"20px"}}> Guiding questions:</Typography>
    <Stack direction={"row"} sx={{width:"100%",justifyContent:"space-between"}}>
      <Button onClick={()=>{decrementNumber()}} variant="contained"><ArrowBackIosIcon/></Button>
      <Card sx={{padding:"20px"}}>{guide[guideNumber]}</Card>
      <Button  onClick={()=>{incrementNumber()}} variant="contained"><NavigateNextIcon/></Button>
    </Stack> 
    
     <Typography fontSize={"20px"} sx={{marginTop:"20px"}}>Book Cover</Typography> 
     

     {/*COVER IMAGE*/}
     <Box sx={{height:"250px",width:"250px",display:'flex',justifyContent:'center',alignItems:"center"}}>
      {isCoverLoading?<CircularProgress/>: 
    <Box  component="img" src={coverImage} sx={{height:"250px",width:"250px",marginTop:"10px"}}></Box>}
    </Box>
    
    <Box sx={{height:"30px",mt:"10px",display:"flex",alignItens:"center"}} >
   <input   value={coverPrompt} onChange={(e)=>{setCoverPrompt(e.target.value)}} style={{height:"100%",marginRight:"10px" }}></input>
    <Button onClick={()=>{handleSubmit()}} sx={{height:"100%"}} variant="contained" type="submit">Generate</Button>
    </Box>


    <Box sx={{height:"1px",width:"100%",background:"grey",marginTop:"40px"}}> </Box>
    <Button onClick={()=>{addPage()}}variant={"contained"} sx={{marginTop:"20px",marginBottom:"20px"}}>Add a page</Button>
   
    <Box sx={{display:"grid",gridTemplateRows:"(1fr,repeat)",gap:2}}>
    {pages.map((page,index)=> {return <CollabPage content={page.pageContent} image={page.pageUrl} setPages={setPages} pages={pages} collabPageId={page.id} key={index}/>})}
    </Box>
    </Box>}
    </Box>
  </>
    
  )
}

export default CollabStoryForm
