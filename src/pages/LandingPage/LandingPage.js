import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Typography } from '@mui/material';
 
const LandingPage = () => {
  const indigo = "#4f46e5"
  const { loginWithRedirect } = useAuth0();
  return (    
    <Box sx={{width:"100vw",height:"100vh",display:"flex"}}>

      <Box sx={{width:"50%",height:"100%"}} component="img" src="/Hero.png">
        
        
      </Box>

      <Box sx={{width:"50%",background:"#141818",display:"flex",justifyContent:"center",alignItems:"center"}}>

        <Box>

        <Typography fontSize="25px" color="white">Explore your imagination with the power of AI</Typography>
        <Button variant="contained" sx={{background:"#4f46e5",marginTop:"20px"}}onClick={()=> {const user = loginWithRedirect( {
        authorizationParams: {
         redirect_uri: "http://localhost:3001/dashboard",
         }})           
      }}>Get started</Button> 
      
        </Box>
      
      </Box>



    </Box>
    
    
      
    
  )
}

export default LandingPage
