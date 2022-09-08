import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import resourses from '../../../features/resouces';
import { useContext } from 'react';
import { Usercontext } from '../../../contexts/Usercontext';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Fireotp({open,setopen,handleaction}) {
 
  let [user,setuser]=useContext(Usercontext)
  let [otp,setotp]=useState('')
  let [tries,settries]=useState(0)
  let [error,seterror]=useState('')
  useEffect(()=>{
   let sendvercode=async()=>{
    let Res=new resourses()
    Res.verificationtype='email'
    Res.email=user.email
    let res= await Res.sendverificationcode()
    setotp(res.otp)
    console.log(res.otp)
   }
   sendvercode()

    
    
  },[])
  let otpref=useRef(null)

  let seterrorr=()=>{
    seterror('Verifiacation code is not valid ')
    otpref.current.value=null
    setTimeout(() => {
      seterror('')
      otpref.current.focus()
      
    }, 3000);
  }
  const handleClose=()=>{
    setopen(false)
    setTimeout(() => {
      window.location.reload()
    }, 300);
  }
let handlesubmit=async()=>{
  
  handleaction()

}
let checkotp=async()=>{
  let otpneeded=otp
  let otpprofided=otpref.current.value
  console.log(otpprofided)
  if (otpneeded!=otpprofided){
    seterrorr()
    settries(t=>t+1)
   
  }
  else{
    handlesubmit()
    
   
  }

  
}

  return (
    <>
     

      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
       
          <Modal.Title>Verify This Transaction</Modal.Title>
        
        </Modal.Header>
        <Modal.Body>
        <Alert severity='info' >we have sent 6-digit code to your email {user.email}</Alert>
        <hr/>
          <Form>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                
                type="text"
                placeholder="OTP"
                autoFocus
                ref={otpref}
                
              />
            </Form.Group>
           
           {tries>4?<Alert severity='warning' variant='standard' >
          you have tried wrong code so many times and that can lead us to suspend your transaction please check before you verify
        </Alert>:'' }
            {error && <Alert severity='error' variant='standard' >
          {error}
        </Alert>}
        <br/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={!otp} variant="primary" onClick={checkotp}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
 
}
