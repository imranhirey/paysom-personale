import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Loading from '../reusable/loading';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { ArrowLeft, ArrowLeftSharp, SwipeLeftAltRounded } from '@mui/icons-material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useContext } from 'react';
import { Usercontext } from '../../contexts/Usercontext';

const Payintent = () => {
    // get params
    let [paymentintent,setpaymentintent] = React.useState(null);
    let  [cu,setcu] = useContext(Usercontext);
    
    let params= useParams()
    let intentid=params.paymentIntentId
  
    useEffect(()=>{
        let getpaymentintentinfo=async(id)=>{
            let res=await axios.post('http://localhost:5500/intents/getintentinfo',{intentid:id});
            console.log('jhjhjh',res.data)
            setpaymentintent(res.data)
         
            }
            getpaymentintentinfo(intentid);
    },[])
    let handleconfirm=()=>{
        let confirm=async()=>{
            let res=await axios.post('http://localhost:5500/intents/payintent',{intentid:intentid,user:cu,token:localStorage.getItem('accesstoken')});
            console.log(res.data)
            if (res.data.status=='success') {
                window.location.href=paymentintent.success_url
            }
        }
        confirm();
    }
   
    if (paymentintent==null) {
        return <Loading />
    }
    if (paymentintent.status=='paid') {
        // redirect to paymentintent.success_url
      window.location.href=paymentintent.success_url

    }
    console.log('paymentintent',paymentintent.who )

    return (
        
            <Box width='100vw' height='100vh' display='flex' justifyContent='center' >
                <KeyboardBackspaceIcon  style={{
                    position: 'absolute',
                    top: '50px',
                    left: '600px',
                    zIndex: '1',
                    color: 'black',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    height: '50px',
                }}/>
                <Box width='600px' display='flex' flexDirection='column' padding={3} height='80%' borderRadius='12px' >
                    <Box  flex={0.3}display='flex' justifyContent='center' alignItems='center' >
                      <img width='200px' height='200px' src='/images/logo.png'/>
                    </Box>
                    <Box  flex={1} >
                      <p style={{
                        fontSize:'20px',
                        fontWeight:'bold',
                        textAlign:'center'
                      }}>{paymentintent.who.bname} want to recharge your account for  {paymentintent.ammount+' '}
                         please if you want to continue with this payment,  click on the Confirm button.

                      </p>
                    </Box>
                    <Box  flex={2} >
                      {//list of payment information}
                        }
                        <ul style={{
                            listStyle:'none',
                            padding:'0px',
                            margin:'0px',
                            textAlign:'center'


                        }}>
                            <li style={{
                                fontSize:'20px',
                                fontWeight:'bold',
                                textAlign:'center'

                            }}>
                                <p>Payment Intent ID: {paymentintent.intent_id}</p>
                            </li>
                            <li>
                                <p>Payment Intent Status: {paymentintent.status}</p>
                            </li>
                            <li>
                                <p>Payment Intent Amount: {paymentintent.ammount}</p>
                            </li>
                          
                            <li>
                                <p>Payment Intent Description: {paymentintent.reason}</p>
                            </li>
                            <img width='200px' height='200px' src={paymentintent.qrcodeurl}/>
                            <p>*You can simply scan this qr to pay it instantly</p>
                           

                        </ul>
                        {//confirm payment button}
                        }
                        <Box style={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop:'20px'

                        }}>
                            <Button  color='error' variant='contained' fullWidth  style={{
                               
                               cursor:'pointer',
                               margin:'10px'

                           }}>Cancel This Payment</Button>
                        <Button onClick={()=>{
                            handleconfirm()
                        }} color='success' variant='contained' fullWidth  style={{
                               
                                cursor:'pointer',
                                margin:'10px'

                            }}>Confirm Payment</Button>
                           
                        </Box>
                        <p>*for any query regarding to this payment please contact with {paymentintent.who.bname+' '} at this email help@daahqaad.com</p>
                        <Button color='warning'>Report This Account</Button>
                    </Box>

                </Box>

            </Box>
            
      
    );
};

export default Payintent;