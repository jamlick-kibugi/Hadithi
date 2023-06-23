import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../constants'
 
 
const StoryPage = () => {

    const [images,setImages]= useState([])
    const [story,setStory] =useState("")
    useEffect(()=>{
        const getStory=async ()=>{
            await axios.get(`${BACKEND_URL}/story`).then((res)=>{
                console.log(res.data[0].content)
                setStory(res.data[0].content)
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
   {story!==""? story:null}
  </div>
    <div>


    {images.map((image,index)=>{
     return <img key={index} src={image.imageUrl}></img>
    })}
       
    </div>
    </>
  )
}

export default StoryPage
