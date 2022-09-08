import React from 'react'
import { Box, Typography, Link } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function Boxes({title,ammount,updated,width,height,margin}) {
  return (
    <Box sx={{
        display:'flex',
        width:`${width}px`,
        height:`${height}px`,
        background:'white',
        borderRadius:'9px',
        flexDirection:'column',
        margin:`${margin}px`,
        
        
        
      }} >
        <Box sx={{
          display:'flex',
          width:'100%',
          height:'35%',
          justifyContent:'space-between',
          
         
          
        }}>
        <Typography sx={{
          color:'black',
          fontSize:'20px',
          fontWeight:'bold',
          padding:'22px'
        }}>{title}</Typography>
         <InfoIcon color='action' sx={{ padding:'22px'}}/>
        
       
         
        
        </Box>
        
        <Box sx={{
          display:'flex',
          width:'100%',
          height:'35%',
          flexDirection:'column'
          
        }}>
        <Typography sx={{
          color:'black',
          fontSize:'40px',
          fontWeight:'bold',
          padding:'22px'
        }}>$ {ammount}.<span style={{
          color:'blue'
        }}>00</span> <Link style={{
            color:'#c6c6c6',
            fontSize:'15px',
          fontWeight:'bold',

        }}>from 13 people</Link></Typography>
        
        
        </Box>
        <Box sx={{
          display:'flex',
          width:'100%',
          height:'35%',
          flexDirection:'column'
          
        }}>
        <Typography sx={{
          color:'#c6c6c6',
          fontSize:'15px',
          fontWeight:'bold',
          padding:'22px',
          letterSpacing:'4px',
          
        }}>{updated} </Typography>
        
        
        </Box>
       
   
   
      </Box>
  )
}
