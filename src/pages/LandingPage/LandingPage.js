import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
  
const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (    
    
    
       <button onClick={()=> {const user = loginWithRedirect( {
        authorizationParams: {
         redirect_uri: "http://localhost:3001/dashboard",
         }})           
      }}>Log In</button> 
    
  )
}

export default LandingPage
