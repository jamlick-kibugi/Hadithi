import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../constants'
import { Box, Pagination, Stack, Typography } from '@mui/material'
import IllustrationCard from '../IllustrationCard'
 
const IllustrationGrid = ({userId,type}) => {

    const [illustrations,setIllustrations] = useState([])
    
    const [pageCount,setPageCount] = useState("")
    const [pageNumber,setPageNumber] = useState(1)
    const [resultCount,setResultCount] =useState("")

    

    useEffect(()=>{
        const getIllustrations=async ()=>{
            await axios.get(`${BACKEND_URL}/story/illustration/${userId}/${pageNumber-1}/12`).then((res)=>{
                 console.log(res.data)
                 setIllustrations(res.data?.rows)
                 setPageCount(Math.ceil(res.data?.count/12))
                 setResultCount(res.data?.count)
            })          
                     }

        getIllustrations()
    
    
    },[pageNumber])
        
  return (<>
    <Box>
    <Typography fontSize={"20px"} marginBottom="20px">{resultCount}{" "}Illustrations</Typography>
  </Box>
  <Box sx={{  
    columnGap:"10px",
    rowGap:"20px",
    margin:"  auto",
    display: 'grid',  
    width:"100%",
   gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))' }}>

       


    {illustrations.map((image,index)=>{
        return <IllustrationCard type={type} setIllustrations={setIllustrations} illustrations={illustrations} key={index} url={image.illustrationUrl} currentIllustrationId={image.id} />
        
        
    })}


</Box>

<Box sx={{ display:"flex",justifyContent:'center'}}>

<Stack spacing={2} sx={{alignContent:"center" ,marginTop:"40px",marginBottom:"40px"}}>
  <Pagination onChange={(e,value)=>{setPageNumber(value)}} count={pageCount} variant="outlined" shape="rounded" />
</Stack>
</Box>
</>

  )
}

export default IllustrationGrid
