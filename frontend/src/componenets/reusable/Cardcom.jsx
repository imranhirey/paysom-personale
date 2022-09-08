import React, { useContext } from 'react'
import { Box, Button, Card, CardHeader } from '@mui/material';
import { Usercontext } from '../../contexts/Usercontext';
import { useNavigate } from 'react-router-dom';

export default function Cardcom() {
  let [user,setuser]=useContext(Usercontext)
  let navigate=useNavigate()
  let paymentmethods=user.finanaces.payment_methods
  return (
   
 
    <Box sx={{
        width:'600px',
        height:'200px',
        background:'white',
        borderRadius:'15px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center' ,
        flexDirection:'column'
        
    }}>
       
      
           
       <Box sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'        }}>
       {paymentmethods.length!=0? <span className='emboss number'>**** **** ****{paymentmethods[0]?.card.last4}</span>:<Button onClick={()=>{
         navigate('/pm')
       }} variant='contained'>Add Card</Button>}
        </Box>
       


    </Box>
    


  )
}
