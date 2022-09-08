import React, { useEffect, useState } from 'react'
import { Box,CircularProgress} from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom';


export default function Loading() {
  let [seconds,setseconds]=useState(0)

 
    let kordhi=()=>{
      setInterval(() => {
        setseconds(seconds+1)
      }, 1000);
    }
    kordhi()
let navigate=useNavigate()

  if(seconds>10){
    navigate('/error')
    
  }
  return (
    <div>
     
      
        <Box sx={{
            width:'100vw',
            height:'100vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <CircularProgress/>

        </Box>
    </div>
  )
}
