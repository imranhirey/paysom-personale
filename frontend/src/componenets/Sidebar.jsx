import { Avatar, Badge, Box, Typography, Button, TextField, Card, CardContent, CardHeader, CardActionArea, CardActions } from '@mui/material';
import React from 'react'
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
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useNavigate } from 'react-router-dom';
import { SendOutlined, Subscriptions, SubscriptRounded } from '@mui/icons-material';
import Areyousure from './payments/popups/Areyousure';
import ContactsIcon from '@mui/icons-material/Contacts';

export default function Sidebar(props) {
  let [showblance,setshowblance]=React.useState(true)
  let [user,setuser]=useContext(Usercontext)
  let [logout,setlogout]=useState(false)
  let [dashboardselcted,setdashboardselcted]=useState(false)
  let navigate=useNavigate()
  let listitems=[
    {status:true,name:'Dashboard',icon:<DashboardIcon/>,selected:dashboardselcted,path:'/'},
    {status:true,name:'Account',icon:<AccountBalanceWalletIcon/>,selected:false,path:'/myaccount'},
    {status:true,name:'Send money',icon:<SendOutlined/>,selected:false,path:'/sendmoney'},
    {status:true,name:'Subscriptions',icon:<Subscriptions/>,selected:false,path:'/subscribtions'},
    {status:true,name:'Recharge',icon:<MoveDownIcon/>,selected:false,path:'/recharge'},
    {status:true,name:'My contacts',icon:<ContactsIcon/>,selected:false,path:'/mycontacts'},
    {status:true,name:'Account Security',icon:<SecurityIcon/>,selected:false,path:'/security'},
    {status:true,name:'History',icon:<HistoryIcon/>,selected:false,path:'/history'},
    {status:true,name:'Payment Methods',icon:<CreditCardIcon/>,selected:false,path:'/pm'},
    {status:false,name:'My donation account',icon:<VolunteerActivismIcon/>,selected:false,path:'/'},
    {status:false,name:'Settings',icon:<SettingsIcon/>,selected:false,path:'/'},
    
   
    
    
  ]
  return (
   
   <Box className='wrapper' sx={{
     width:'100vw',
     height:'100vh',
     background:'#f7f7ff',
     display:'flex',
     
     
   }}>
<Box sx={{
  flex:1,
  display:'flex',
  margin:'16px',
  flexDirection:'column',
 
  
  



}}>
  <Box sx={{
    width:'100%',
    height:'150px',
    background:'white',
    borderRadius:'10px',
    margin:'10px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:'8px',
    
   

  }}>
<img src='/images/logo.png' width='300px' height='300px'/>    </Box>
    <Box sx={{
    width:'100%',
    height:'70%',
    background:'white',
    borderRadius:'10px',
    margin:'10px',
    padding:'8px',
  
   
  }}>
    <List  sx={{
      position:'fixed',
    // selected and (selected + hover) states
    '&& .Mui-selected, && .Mui-selected:hover': {
      bgcolor: 'dodgerblue',
      '&, & .MuiListItemIcon-root': {
        color: 'white',
        borderRadius:'12px',

      },
    },
    // hover states 
    '& .MuiListItemButton-root:hover': {
      bgcolor: 'orange',
      '&, & .MuiListItemIcon-root': {
        color: 'yellow',
      },
    },
  }}>
      
      {listitems.map(item=>(
        <ListItem key={item.name} disabled={!item.status} onClick={()=>{
            window.location.replace(item.path)
            
        }} selected={item.selected} onSelect={()=>{
          alert('waaw')
        }} sx={{
          cursor:'pointer'
        }}>
          <ListItemAvatar >
            <Avatar>
              {item.icon}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name}  />
          
        </ListItem>
        
      ))}
       
    </List>
   
    </Box>
    <Box sx={{
   width:'100%',
   height:'50px',
   background:'#B23B3B',
   display:'flex',
   justifyContent:'center',
   alignItems:'center',
   borderRadius:'12px'
    }}>
     
<LogoutIcon  sx={{
  color:'white',
  fontSize:'25px',
  margin:'9px'
}}/>
 <Button onClick={()=>{
  setlogout(true)

 }}>
 <Typography  sx={{
   color:'white',
   fontSize:'25px'
 }}>logout</Typography>
 </Button>
       </Box>
</Box>


<Box sx={{
  flex:6,
 margin:'16px',

 

}}>
  <Box sx={{
    width:'80%',
    height:'50px',
    borderRadius:'10px',
    margin:'10px',
   
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center'
    
  }}>
    
      
  </Box>

{props.children}
   
{logout && <Areyousure bodytext='if you logout you need to enter to credentials again' setopen={setlogout} headingtext='are you sure to logout?' oktitle='sure' closetitle='oh no' handleaction={()=>{
   let resourses= new Resourses()
   resourses.logout()
}} open={logout}/>}
</Box>


   </Box>
  )
}
