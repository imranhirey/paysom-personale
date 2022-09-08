import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import servererror from '../../assets/servereerror.png'
import { Offline, Online } from "react-detect-offline";
let online=new Online()


export default function Errorpage() {
  return (
    <Online>
        <Box sx={{
        width:'100vw',
        height:'100vh',
        display:'flex'
      }}>
        <Box sx={{
          display:'flex',
          justifyContent:'center'
        }}>
        <img src={servererror} />
        </Box>
        <Box sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column'
        }}>
         <Box>
         <Typography sx={{
           fontSize:'27px',
           fontWeight:'bold',
           
         }} >OOPS! <span style={{
           color:'red'
         }}>SOMETHING WENT WRONG</span></Typography>
          <Typography sx={{
           fontSize:'18px',
           fontWeight:'300',
           marginLeft:'30px'
           
         }} gutterBottom>our team is working hard to fix this issue</Typography>
         </Box>
         <Box>
         <Button onClick={()=>{
           window.location.replace('/')
         }} variant='contained'>Try again</Button>
         </Box>
         

        </Box>

      </Box>
     
    </Online>
  )
}
