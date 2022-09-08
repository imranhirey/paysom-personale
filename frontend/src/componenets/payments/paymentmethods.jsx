import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { Component, useContext, useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Usercontext } from '../../contexts/Usercontext';
import AddCardIcon from '@mui/icons-material/AddCard';
import Addpaymentmethodpopup from './popups/Addpaymentmethod-popup';
import CallMissedOutgoing from '@mui/icons-material/CallMissedOutgoing';
import CreditCard from '@mui/icons-material/CreditCard';
import resourses from '../../features/resouces';
import Removecard from './popups/Removecard';
import { useNavigate } from 'react-router-dom';
import Appsnackbar from '../reusable/AppSnackbar';
import { Snackcontext } from '../../contexts/Snackbarcontext';

export default function Paymentmethods() {
let [user,setuser]=useContext(Usercontext)
let [dpm,setdpm]=useState({})
let [paymentmethods,setpaymentmethods]=useState(user.finanaces.payment_methods)
React.useEffect(()=>{
    paymentmethods.map(x=>{
        if (x.card.metadata.default=='true'){
            setdpm(x)
        }
        else{
            return null
        }
    })
},[])

let havepaymentmethod=paymentmethods.length<=0?false:true
let [add,setadd]=useState(false)
let [open,setopen]=useState(false)
let [removewarning,setremovewarning]=useState(false)
let [idtoremove,setidtoremove]=useState(null)
let [message,setmessage]=useContext(Snackcontext)
let navigate= useNavigate()
let removepaymentmethod=async(id)=>{
    setremovewarning(false)
   
    let Res= new resourses()
    Res.removepaymentmethod(id)
    setmessage('removing ...')
    setTimeout(() => {
       window.location.reload()
    }, 100);
    
  
    
}
let Havpaymentmethod=()=>{
    return (<>
    <Box sx={{
        width:'90%',
        height:'90%',
        display:'flex',
        flexDirection:'column'

    }}>
        <Card>
            <CardHeader  title='Your Saved Cards'/>
            <CardContent>
            <List sx={{ width: '100%',height:'auto', bgcolor: 'background.paper',display:'flex',flexWrap:'wrap'}}>
      
     
     {paymentmethods.map((pm)=>{
         console.log('defaultiga ',dpm)
         if (pm==null){
           return null
         }
         return(
             <>
              <ListItem sx={{
         background:'grey',
         borderRadius:'7px',
         color:'white',
         margin:'7px',
         display:'flex',
         flexDirection:'column',
         justifyContent:'center',
         padding:'10px',
         flexBasis: '25%'
        
       }} >
            {pm==dpm &&  <Chip sx={{
                
                marginRight:'85%'
             }} label="Default" color="primary" variant="contained" />}
         <ListItemAvatar >
           <Avatar sx={{ background:'white',display:'flex',justifyContent:'center',alignItems:'center', marginLeft:'8px'}}>
             <CreditCard sx={{
               color:'green',
              
             }}/>
           </Avatar>
         </ListItemAvatar>
       
         <ListItemText primary={pm.card?.brand}/>
         <ListItemText  secondary={<Typography sx={{
             marginLeft:'50px'
         }}>{pm?.card?.name}</Typography>}  primary={<Typography sx={{
             fontSize:'30px'
         }}>{'**** **** **** '+pm.card?.last4}</Typography> }/>
         <Button onClick={()=>{
             setidtoremove(pm.card?.fingerprint)
             setremovewarning(true)
             }} variant='contained' color='secondary'>Remove</Button>
             <br/>
              {pm==dpm?'':<Button onClick={async()=>{
                  let Res= new resourses()
                  let respond= await Res.setdpm(pm)
                  setmessage(respond.data.msg)
                  setTimeout(() => {
                    window.location.reload()
                 }, 1000);
              }} variant='contained' color='primary'>set default</Button>}
       </ListItem></>
         )
     })}
       </List>
            </CardContent>
            <CardContent>
            <Button onClick={()=>{
                
            setopen(true) 
        }} sx={{
            margin:'7px',
            
        }} variant='contained' >Add More Payment Methods</Button>
            </CardContent>
        </Card>

    </Box></>)
    
}
let Nopaymentmethod=()=>{
    return (
        <>
        <Box sx={{
            width:'90%',
            height:'90%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column'

        }}>
        <AddCardIcon sx={{
            width:'100px',
            height:'100px'
        }}/>
        <Typography variant='h4'>you dont have any payment method to list please add one.</Typography>
        <Button onClick={()=>{
            setopen(true) 
        }} sx={{
            margin:'7px'
        }} variant='contained' >Add Payment Method</Button>
        </Box>
        </>
    )
    
}
  return (
    <div>
        <Sidebar>
           <Box sx={{
               width:'100vw',
               height:'100vh',
               padding:'5px',
               background:'white'
           }}>
               
               <Removecard idtoremove={idtoremove} removepaymentmethod={removepaymentmethod} removewarning={removewarning} setremovewarning={setremovewarning}/>
               {open && <Addpaymentmethodpopup setopen={setopen} open={open}/>}
               {!havepaymentmethod?<Nopaymentmethod/>:<Havpaymentmethod/>}
               {open && <Addpaymentmethodpopup setopen={setopen} open={open}/>}


           </Box>
        </Sidebar>
    </div>
  )
}
