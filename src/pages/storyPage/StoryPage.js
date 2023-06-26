import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../constants'
import { Box } from '@mui/material'
 
 
const StoryPage = () => {

const formatPage=(paragraph)=>{
    const sentenceBoundary = /(?<=[.!?])\s+/;
    const sentences = paragraph.split(sentenceBoundary);
    const trimmedSentences = sentences.map((sentence) => sentence.trim());

    const groupedSentences = [];
    let currentGroup = '';

    const linesPerPage = Math.ceil(sentences.length/3)

    for (let i = 0; i < trimmedSentences.length; i++) {
        if (i % linesPerPage === 0 && i !== 0) {
        groupedSentences.push(currentGroup);
        currentGroup = '';
        }
        currentGroup += trimmedSentences[i] + ' ';
    }

    if (currentGroup !== '') {
        groupedSentences.push(currentGroup.trim());
    }

    return groupedSentences;
    }

    const [images,setImages]= useState([])
    const [story,setStory] =useState([])
    
    useEffect(()=>{
        const getStory=async ()=>{
            await axios.get(`${BACKEND_URL}/story`).then((res)=>{
                console.log(res.data[0].content)
                setStory(formatPage(res.data[0].content))
               
            })    
            await axios.get(`${BACKEND_URL}/story/images`).then((res)=>{
                console.log(res.data)
                setImages(res.data)
            })         

        }
        getStory()


    },[])


  return (<>


  <div>
   {story.length!==0 && images.length!==0 ?story.map((paragraph,index)=>{
        return <><Box>{paragraph}</Box>
        <Box>
            <img src={images[index]?.imageUrl}></img>
        </Box>
        </>
   }):null}
  </div>
    {/* <div>


    {images.map((image,index)=>{
     return <img key={index} src={image.imageUrl}></img>
    })}
       
    </div> */}
    </>
  )
}

export default StoryPage
