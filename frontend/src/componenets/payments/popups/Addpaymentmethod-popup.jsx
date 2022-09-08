import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import resourses from '../../../features/resouces';
import { Alert, ButtonGroup, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Addpaymentmethodpopup({setopen,open}) {
 
  const [name,setname]=React.useState('')
  const [cardnumber,setcardnumber]=React.useState('')
  const [expm,setexpm]=React.useState('')
  const [expy,setexpy]=React.useState('')
  const [cvc,setcvc]=React.useState('')
  const [zip,setzip]=React.useState('')
  const [loading,setloading]=React.useState(false)
  const [error,seterror]=React.useState('')
  let [pm,setpm]=React.useState('')


  let navigate= useNavigate()


 let handlesubmit=async(event)=>{
  event.preventDefault();
  setloading(true)
 let data={
   name,cardnumber,expm,expy,cvc,zip
 }
 let Res= new resourses()
 let res = await Res.addpaymentmethod(data)
 console.log('from add payment',res.data)
 setloading(false)
 let error=res.data.error
 let ok=res.data.msg
 error?seterror(error):setopen(false)

 console.log(error?error:ok)
 if (!error){
  setTimeout(() => {
    window.location.reload()
  }, 100);
 }
 


 }

  const handleClose = () => {
    setopen(false);
  };
  

 

  return (
    <>
    {pm?<div>
     
     <Dialog sx={{
       borderRadius:'20px'
     }} open={open}  onClose={handleClose}>
      {loading &&  <LinearProgress/>}
      {error && <Alert severity='error'>{error}</Alert>}
      <DialogTitle>Add Your Card</DialogTitle>
       <form onSubmit={handlesubmit}>
       <DialogContent>

         <DialogContentText>
          we will keep your card in seure servers 
         </DialogContentText>
       
        <TextField
           autoFocus
           margin="dense"
           id="name"
           onChange={(e)=>{
            setname(e.target.value)
           }}
           label="name"
           type="cardno"
           fullWidth
           variant="standard"
           required
           placeholder='name on the card'
           autoComplete='off'
         />
         <TextField
          autoComplete='off'
           autoFocus
           onChange={(e)=>{
             setcardnumber(e.target.value)
            }}
           margin="dense"
           id="name"
           label="Card Number"
           type="cardno"
           fullWidth
           variant="standard"
           required
           placeholder='5100 0000 0000 0000'
         />
         <TextField
          autoComplete='off'
           autoFocus
           onChange={(e)=>{
             setexpm(e.target.value)
            }}
           margin="dense"
           id="name"
           label="Exp Month"
           type="number"
           required
           placeholder='01'
           variant="standard"
         />
         <TextField
          autoComplete='off'
          onChange={(e)=>{
           setexpy(e.target.value)
          }}
           placeholder='2022'
           margin="dense"
           id="name"
           label="Exp Year"
           type="expyear"
           required
           variant="standard"
         />
         <TextField
          onChange={(e)=>{
           setcvc(e.target.value)
          }}
          autoComplete='off'
           autoFocus
           placeholder='121'
           margin="dense"
           id="name"
           label="CVC"
           type="expyear"
           required
           variant="standard"
         />
         <TextField
         onChange={(e)=>{
           setzip(e.target.value)
          }}
          autoComplete='off'
           autoFocus
           placeholder='Zip Code'
           margin="dense"
           id="name"
           label="Postal Code / Zip Code"
           type="expyear"
          
           variant="standard"
         />
        
         
       </DialogContent>
       <DialogActions>
         <Button color='warning' onClick={handleClose}>Cancel</Button>
         <Button type='submit' variant='contained'>Add</Button>
       </DialogActions>
       </form>
     </Dialog>

   </div>:
   <Dialog sx={{
    borderRadius:'20px',
  }} open={open}  onClose={handleClose}>
   <DialogContent>
   <DialogTitle>Choose Payment Method</DialogTitle>
<DialogContentText>
 your payment method will be used to recharge your account
</DialogContentText>
<DialogActions sx={{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  padding:'15px'
  
}}>
   <Button onClick={()=>{
     setpm('card')
   }} type='submit' variant='contained'>Credit / Debit Card</Button>
<Button type='submit' variant='contained'>Bank Account</Button>
        
       </DialogActions>



</DialogContent>
   
 
  </Dialog>}
    </>
  );
}
