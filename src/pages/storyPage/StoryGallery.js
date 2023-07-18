import React, { useContext, useEffect, useRef, useState } from 'react'
 
import { Box, Button, Pagination, Stack, TextField, Typography } from '@mui/material'
 
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import { useForm, SubmitHandler } from "react-hook-form"
import CreateOptions from '../../components/CreateOptions'
import PersonalisedStoryForm from '../../components/PersonalisedStoryForm'
import CreateStory from '../../components/CreateStory'
import { useAppContext } from '../../context/appContext'
import CircularProgress from '@mui/material/CircularProgress';
import { useOnDraw } from '../../components/Hooks'
import Canvas from '../../components/DrawingCanvas'
import html2canvas from 'html2canvas'
import { storage } from '../../firebase';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import BrushIcon from '@mui/icons-material/Brush';
import Crop169Icon from '@mui/icons-material/Crop169';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import createIllustration from '../../utils/createIllustration';
import IllustrationCard from '../../components/IllustrationCard';
import StoryCover from '../../components/StoryCover';
import StoryGrid from '../../components/StoryGrid/StoryGrid';
 
const StoryGallery = () => {

    const [storiesArray,setStoriesArray] = useState([])
    const {currentUserId} = useAppContext()
    const [pageCount,setPageCount] = useState("")
    const [pageNumber,setPageNumber] = useState(1)
    const [resultCount,setResultCount] =useState("")

    
 
        
 

    useEffect(()=>{
        const getStories=async ()=>{
            // const story = axios.get(`${BACKEND_URL}/story/${pageNumber-1}/6/?ageId=${values.ageId}&genreId=${values.genreId}&searchText=${values.searchText}`).then((res)=>{ 
            await axios.get(`${BACKEND_URL}/story/${currentUserId}/${pageNumber-1}/6`).then((res)=>{
                 console.log(res.data)
                 setStoriesArray(res.data?.allStory.rows)
                 setResultCount(res.data?.allStory.count)
                 setPageCount(Math.ceil(res.data?.pageCount))
                //  setResultCount(res.data?.count)
            })          
         }

        getStories()
    
    
    },[pageNumber])
        

 
 
  return (<>


       

    <Box sx={{background:"white",padding:"20px",borderRadius:"20px", alignItems:"center",display:"flex",flexDirection:"column",background:"#f8fafc"}}>
    <StoryGrid userId={currentUserId} type={"delete"}/>
      
     </Box>
    
    </>

    
    
  )
}

export default StoryGallery
