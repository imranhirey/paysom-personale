import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import uselocation from '../features/uselocation'
import { Cookies } from 'react-cookie';



export default function Terms() {
    let kook= new Cookies()
    let opened= kook.get('opened')
    console.log(kook.get('opened')) 
    let [open,setopen]=useState(typeof(opened)==='undefined'?true:false)
    
    uselocation()
   
    let agreed=()=>{
        kook.set('opened','false')
        setopen(false)

    }
        
        
       

  return (
    <div >
       {open && <Dialog

open={open}
onClose={()=>alert('hi closed')}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">
  {"Can DIU use your cookeis and location?"}
</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-description">
    DIU WILL  use your cookies and location  to enhase the user
    experience and costomize your needs also cookies can be 
    used for protecting your account from maliacious hackers
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={agreed}>Disagree</Button>
  <Button onClick={agreed}>
    Agree
  </Button>
</DialogActions>
</Dialog>}
        
    </div>
  )
}
