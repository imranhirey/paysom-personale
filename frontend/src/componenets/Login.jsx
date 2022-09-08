import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Alert, Box, Button, Card, CardContent, CardHeader, Divider, LinearProgress, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import Resourses from '../features/resouces';
import Appinputfield from './reusable/Appinputfield';
import logo from '../images/diu-logo.png'
import loging from "../images/login.jpg";

import login from '../assets/login.mp3'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
function Login() {
  let params=useParams()
let navigate=useNavigate()
  let [username,setusername]=useState(null)
  let [password,setpassword]=useState(null)
  let [loading,setloading]=useState(false)
  let [error,seterror]=useState('')
  let [success,setsuccess]=useState('')
  let [intent,setintent]=useState(params?.paymentIntentId)
 
  console.log(intent)
  useEffect(()=>{
    let getpaymentintentinfo=async(id)=>{
        let res=await axios.post('http://localhost:5500/intents/getintentinfo',{intentid:id});
        console.log('jhjhjh',res.data)
        setintent(res.data)
     
        }
       params.paymentIntentId &&  getpaymentintentinfo(intent);
},[])
  

  let handlesubmit=async(e)=>{
    e.preventDefault()
   setloading(true)
    let data={
      email:username,
      password:password

    }
    if (data.email && data.password){
      try {
      let resources= new Resourses()
      let res=await resources.login(data)
      console.log('jawaab',res)
      if(res.data.status=='notfound'){
        seterror('we can not find a user with that credentials')
        setloading(false)
      } 
      else{
       seterror('')
       setsuccess('sucess redirecting ....')
       setloading(false)
       setTimeout(() => {
         window.location.reload()
         
       }, 1000);
        
      }
      } catch (error) {
        seterror(error.message)
        setloading(false)
        
      }
      
    
  }
   else{
    setloading(false)
    seterror('Both fields are reuired')
    setTimeout(() => {
      seterror('')
    }, 2000);
   }
  
    


  }
  
  return (
<>

<Box sx={{
    display:'flex',
    width:'100vw',
    height:'100vh',
    justifyContent:'center',
    alignItems:'center'
  }}>
    
    <Box sx={{
      flex:1,
      margin:'10px',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }}>
       <div style={{width:'700px',height:'900px'}}>
    
    <img src='/images/logo.png' width='400px' height='400px' style={{
      
   
    }} />

    <CardHeader style={{
           
    }} title={intent==undefined?'login':<>
      <p style={{
      margin:'15px',
      fontSize:'20px',
      color:'dodgerblue'
    }}>
      Your are about to pay {intent?.ammount} USD for a {intent?.reason} to {intent?.who?.bname} to 
      process your payment please enter your credentials 

      </p>
    </>}/>
  

    <CardContent>
      



    <form style={{
    
     
    }} onSubmit={handlesubmit}>
        <Appinputfield   onchange={(e)=>{
          setusername(e.target.value)
        }} type='email'  name='email or number' label='Email' placeholder='enteremail or number'/>
        <Divider/>
        <Appinputfield type='password' onchange={(e)=>{
          setpassword(e.target.value)
        }} name='password' label='password' placeholder='enter your password'/>
       <Button disabled={loading} sx={{marginBottom:'15px'}} variant='contained' type='submit'>login</Button>
      <Box>
      <Button onClick={()=>{
        window.location.replace('/register')
      }}>
        don't have an account
      </Button>
      </Box>
       {error && <Alert severity='error' >{error}</Alert>}
       {success && <Alert severity='success' >{success}</Alert>}
       {loading && <>
      <LinearProgress/>
       </>}
      </form>
      
    </CardContent>
    
  </div>

    </Box>
   
   
    
  </Box>
</>
  
    // <div>Login 
    //     <form onSubmit={handlesubmit}>
    //       <input ref={username} type='text' name='email or number' placeholder='enteremail or number'/>
    //       <input ref={password} type='password' name='password' placeholder='enter your password'/>
    //       <button type='submit'>login</button>
    //     </form>
    // </div>
  )
}

export default Login