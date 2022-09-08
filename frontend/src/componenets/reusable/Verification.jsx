import { Box, Button, CircularProgress, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import errorimage from '../../images/error.svg'
import resourses from '../../features/resouces';
import Verificationform from './Verificationform';
import Startprocess from './Startprocess';
export default function Verification() {
    let [checked,setchecked]=useState(false)
    let [error,seterror]=useState(false)
    let navigate= useNavigate()
    let params = useParams()
    let verifytoken=()=>{
      let token= params.id
      let Resources= new resourses()
      Resources.token=token
      Resources.verifytoken()
      .then((resp)=>{
        let res=resp.data.data
        if(res==='error'){
          seterror(true)
          setchecked(true)
        }
        else{
          seterror(e=>e)
          setchecked(true)
        }
        
      })
        
    

    }
    useEffect(()=>{
      verifytoken()
    },[])
    if(!checked){
      return (
        <>
        <Box sx={{
          width:'100vw',
          height:'100vh',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column'
        }}>
        <CircularProgress />
        <Typography sx={{
          marginTop:'20px'
        }}>checking the link</Typography>
        </Box>
        </>
      )
    }
 if (checked && error){
   return <Box sx={{
    width:'100vw',
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  }}>
     <img alt='error'  width='500px' height='500px' src={errorimage}/>
     <Button onClick={()=>{
       navigate('/',{
         replace:true
       })
     }}>Go back to the home page</Button>
   </Box>
 }
 if(checked && !error){
   return <Startprocess/>
 }
}
