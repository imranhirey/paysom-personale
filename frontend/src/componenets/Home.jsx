import { Avatar, Badge, Box, Typography, Button, TextField, Card, CardContent, CardHeader, CardActionArea, CardActions, Divider } from '@mui/material';
import React, { useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useContext, useState } from 'react';
import { Usercontext } from '../contexts/Usercontext';
import Popupyesno from './reusable/Popupyesno';
import logo from '../images/logo-2.png'
import diulogo from '../images/diu-logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import imran from '../images/imran.jpg'
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import SecurityIcon from '@mui/icons-material/Security';
import AppChart from './reusable/AppChart';
import Boxes from './reusable/Boxes';
import Resourses from '../features/resouces';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Cardcom from './reusable/Cardcom';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import ads from '../images/adv.png'
import Botomnavigate from './Buttomnavigation';
import { Snackbar } from '@mui/material/Snackbar';
import Notifications from './reusable/Notifications';
import {io} from  'socket.io-client'
import resourses from '../features/resouces';
import axios from 'axios';

var socket = io('http://68.183.246.197:4000');
export default function Home() {
  let [showblance,setshowblance]=React.useState(true)
  let [user,setuser]=useContext(Usercontext)
  let [blance,setblance]=useState(user.finanaces.blance)
  let [activesubs,setactivesubs]=useState([])
  socket.on('connect',()=>{
    console.log('connecred ..')
  })
  socket.on('updateblance'+user.cus_id,(payload)=>{
    console.log('from socket listening ',setblance(payload.newblance))  })

  let paymentmethods=user.finanaces.payment_methods
 useEffect(()=>{
  let getmysubs=async()=>{
    let res= await axios.get('http://localhost:5500/subscriptions/getuseractivesubs/cus_MODqrCunyPyNgv')
    setactivesubs(res.data.subscriptions)
  }
getmysubs()

 },[])

  return (
    <div>
    
      
      <Sidebar>
      <Box sx={{
      width:'100%',
      height:'150px',
      display:'flex',
      alignItems:'center',
      padding:'10px',
      margin:'20px'
    }}>
    
   <Box sx={{
     display:'flex',
     width:'300px',
     height:'200px',
     background:'white',
     borderRadius:'9px',
     flexDirection:'column'
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
     }}>BALANCE</Typography>
     <Button onClick={()=>{
       setshowblance(!showblance)
     }} > {showblance?<VisibilityOffIcon   color='action' sx={{ padding:'22px',cursor:'pointer'}}/>: <VisibilityIcon   color='action' sx={{ padding:'22px',cursor:'pointer'}}/> }</Button>
     
    
      
     
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
     }}>$ {showblance?blance:'***'}{showblance?'.':''}<span style={{
       color:'blue'
     }}>{showblance?'00':'**'}</span></Typography>
     
     
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
       letterSpacing:'4px'
     }}>updated now </Typography>
     
     
     </Box>
    


   </Box>
   
   <Box sx={{
     display:'flex',
     width:'300px',
     height:'200px',
     background:'white',
     borderRadius:'9px',
     flexDirection:'column',
     margin:'9px'
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
     }}>Active Subscribtions</Typography>
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
     }}>{activesubs.length}</Typography>
     
     
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
       letterSpacing:'4px'
     }}>updated now </Typography>
     
     
     </Box>
     
    
  

   </Box>
   
   <Box sx={{
     width:'600px',
     height:'200px',
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
     background:'#f7f7ff'
   }}>
     
     <Box>
  <Cardcom/>
  </Box>
    
   </Box>
   <Box sx={{
 
 display:'flex',
  width:'350px',
  height:'750px',
  background:'white',
  borderRadius:'9px',
  flexDirection:'column',
  
  margin:'9px',
  marginTop:'560px',
}}>
<Box sx={{
  width:'350px',
  height:'100px',
 
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column'
}}>
<Typography sx={{fontSize:'18px',fontWeight:'bold'}}>-Sponsred-</Typography>
</Box>
<Divider/>
<Box sx={{
  width:'350px',
  height:'650px',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
  borderRadius:'10px'
}}>
   <img src={ads} width='350px'/>


</Box>
<Divider/>
<Box sx={{
  width:'350px',
  height:'200px',
  
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
  borderRadius:'16px'
}}>
  <img style={{
    borderRadius:'15px'
  }} src='https://diu.ac/front/images/about/campus.jpg' width='350px'/>

</Box>



</Box>

    </Box>
    
    <Box sx={{padding:'10px', display:'flex'}}>
    <Boxes width={600} height={200} margin={10} title='Total Request Recieved' ammount={200} updated='updated 19 sec ago' />
    
    <Card sx={{
     width:'600px',
     height:'200px',
     borderRadius:'9px',

     margin:'10px'
   }}>
     <CardHeader title='Request money'/>
     
     <CardContent>
     <TextField  autoComplete='off' variant='standard' sx={{marginRight:'8px'}} placeholder='Account Number/Email'/>
     <TextField  type='number' variant='standard'  autoComplete='off' placeholder='Enter the ammount'/>
     </CardContent>
     <Button sx={{margin:'11px'}} color='success' variant='contained'>Send money request</Button>
   </Card>

    </Box>
  


  <Box sx={{
    width:'100vw',
    height:'200px',
    borderRadius:'9px',
    display:'flex',
   
    margin:'10px'
  }}>
    <Box >
     <Card sx={{
      width:'600px',
      borderRadius:'20px'
    }}>
     <CardHeader title='Recent Transactions'/>
     <CardContent>
     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      
     
     <ListItem sx={{
        background:'#cf6161',
        borderRadius:'7px',
        color:'white',
        margin:'7px'
      }} >
        <ListItemAvatar >
          <Avatar sx={{ background:'white'}}>
            <CallMissedOutgoingIcon sx={{
              color:'red'
            }}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText  primary='$ 80'  secondary='To Ubeid nur hirey on 25-july-2022'  />
      </ListItem> <ListItem sx={{
        background:'#43a380',
        borderRadius:'7px',
        color:'white',
        margin:'7px'
      }} >
        <ListItemAvatar >
          <Avatar sx={{ background:'white'}}>
            <CallReceivedIcon sx={{
              color:'green'
            }}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText  primary='$80'  secondary='from Ubeid nur hirey on 25-july-2022'  />
      </ListItem>
      <ListItem sx={{
        background:'#43a380',
        borderRadius:'7px',
        color:'white',
        margin:'7px'
      }} >
        <ListItemAvatar >
          <Avatar sx={{ background:'white'}}>
            <CallReceivedIcon sx={{
              color:'green'
            }}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText  primary='$600'  secondary='from maan nur hirey on 25-july-2022'  />
      </ListItem>
     
      
  
     
  </List>
  
     </CardContent>
     
   </Card>
  
   </Box>
 
  <Box sx={
    {
      width:'600px',
      height:'200px',
      background:'white',
     marginLeft:'40px',
      borderRadius:'15px',
     

    }
  }>
<Card sx={{
  borderRadius:'15px',

}}>
  <CardHeader title='your spendings figure'/>
<AppChart/>
</Card>
  </Box>
  

  </Box>
 
      </Sidebar>
     
     
    </div>
  )
}
