import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Sidebar from '../Sidebar';
import resourses from '../../features/resouces';
import { useContext } from 'react';
import { Usercontext } from '../../contexts/Usercontext';
import { Box } from '@mui/system';
import {CircularProgress,Typography,Button, Paper, Divider, TextField,LinearProgress} from'@mui/material'
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import Loading from './loading';

export default function Transaction() {
    let [trx,settrx]=React.useState()
    let findtrx=()=>{
        let Res=new resourses()
        let res=  Res.getmytransactions(user.cus_id)
        console.log('xogta',res.data)
        settrx({
            out:res.data.data.from,
            in:res.data.data.to

        })
        
    }
    let [user,setuser]=useContext(Usercontext)
    React.useEffect(()=>{
        let get_all_trx=async()=>{
            let Res=new resourses()
            let res= await Res.getmytransactions(user.cus_id)
           console.log('xogta',res)
            console.log(user.cus_id)
            console.log(res.data.data.from.find(x=>x.from.name=='imran nur hirey' || x.to.name=='imran nur hirey'))
            settrx({
                out:res.data.data.from,
                in:res.data.data.to

            })
        }
        get_all_trx()
        


    },[])
    let lacagtasoogashay=0
    trx?.in?.map(x=>{
        lacagtasoogashay=parseInt(lacagtasoogashay)+parseInt(x.amount)
        
    })
    let date =new Date()
  return (
    <Sidebar>
<TextField  onChange={(e)=>settrx('')} sx={{
marginLeft:'16px'
}}type='search' placeholder='Serach transaction'/>
    <Box sx={{
        display:'flex',
      
        
        width:'90%'

    }}>
        
        <Box sx={{
            width:'50%',
            
        }}>
           
        <List sx={{ width: '100%', height:'800px',bgcolor: 'background.paper' ,marginTop:'25px',borderRadius:'16px',marginLeft:'12px',maxHeight: 800, overflow:'scroll','&::-webkit-scrollbar': {
    width: '0.6em'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey'
  }}}>
            {!trx &&<Loading/>}
           
           
     {trx?.in?.map(trx=>(
         
         <>
       
         
         <ListItem sx={{
            
             
         }}>
          <ListItemAvatar>
            <Avatar sx={{
                color:'white',
                background:'green'
            }}>
              <CallReceivedIcon color='green' />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={'$'+trx?.amount+' #'+trx?.trx_id} secondary={'you recieved $'+trx?.amount +' from '+' '+trx?.from?.name+' on '+trx?.timestamp} />
        </ListItem>
        
         </>
          
     ))}
    </List>
        </Box>
        <Box sx={{
            width:'50%'
        }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', height:'800px',marginTop:'25px',borderRadius:'16px',marginLeft:'12px',maxHeight: 800, overflow:'scroll','&::-webkit-scrollbar': {
    width: '0.6em'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey'
  }}} >
           {!trx && <LinearProgress sx={{
                marginLeft:'30px'
            }}/>}
            
     {trx?.out?.map(trx=>(
         <>
          <ListItem>
          <ListItemAvatar>
            <Avatar sx={{
                color:'white',
                background:'red'
            }}>
              <CallMissedOutgoingIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={'$'+trx?.amount+' #'+trx?.trx_id} secondary={'you sent $'+trx?.amount +' to '+' '+decidename(trx)+' on '+trx?.timestamp} />
        </ListItem> </>
        
     ))}
    </List>
        </Box>

    </Box>
    </Sidebar>
  );
}

let decidename=(trx)=>{
  // in trx.to there can be a name or a bname
  if(trx.to.name){
    return trx.to.name
  }
  else{
    return trx.to.bname
  }
  

}