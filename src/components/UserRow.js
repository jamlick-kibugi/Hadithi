import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
 
const UserRow = ({name,email,picture,biography,userId}) => {
    const navigate= useNavigate()
    const {selectedUserId,setSelectedUserId} =useAppContext()
  return (
    <>
    <Stack direction="row" sx={{width:"100%",justifyContent:"space-between"} }>
        <Stack direction="row" sx={{width:"100%"}}>
       <Box component="img" src={picture} sx={{borderRadius:"50%", width:"50px"}}></Box>
       <Stack direction="column" sx={{paddingLeft:"20px"}}>
        <Typography>{name}</Typography>
        <Typography>{email}</Typography>
        <Typography>{biography}</Typography>

       </Stack>
       </Stack>

       <Stack> 
        <Button onClick={ ()=>{
                  navigate("/dashboard/user/info")
                  setSelectedUserId(userId) } } variant="contained">View</Button>
       </Stack>

    </Stack>
    <Divider/>
    </>
  )
}

export default UserRow
