import React from 'react'
import { Box, Card, CardHeader, CardContent, Typography, Link, Button, CardActions } from '@mui/material';
import { Check, Download } from '@mui/icons-material';
import process from '../../../images/process.svg'
import { useSelector } from 'react-redux';
import { Cookies } from 'react-cookie';

export default function Agreement({setagreementtaccepted}) {
   
    let cookies= new Cookies()
    
    
  return (
    <Box sx={{
        width:'100vw',
        height:'100vh',
        
        padding:'20px',
        display:'flex',
    }} className='startprocess'>
        <Box sx={{
          flex:1
        }}>
            <Box>
                <Card>
                    <CardHeader title='Verification Process'/>
                     <CardContent>
                         <Typography  variant='h5'>
                          you have successfully registered but we have to take 
                             some more steps to verify your identity and wether you
                             comply <Link>our ploicy</Link> or not
                         </Typography>
                         <Typography variant='h5' gutterBottom>
                         our verification 
                             process consist of three parts 
                         </Typography>
                        <Box sx={{
                            display:'flex',
                            
                            alignItems:'center'
                        }}>
                        <Typography variant='h6'>
                            Email and phone number verification
                         </Typography>
                         <Check color='success'/>
                        </Box>
                        <Box sx={{
                            display:'flex',
                            
                            alignItems:'center'
                        }}>
                        <Typography variant='h6'>
                            identity verification
                         </Typography>
                         <Check color='success'/>
                        </Box>
                        <Box sx={{
                            display:'flex',
                            
                            alignItems:'center'
                        }}>
                        <Typography variant='h6'>
                            Documents verification
                         </Typography>
                         <Check color='success'/>
                        </Box>
                        <Typography gutterBottom variant='h5'>
                            only users who took these processes and successfully completed
                            will be able to use our serveses if you encounter any
                            problem during this process please don't hestitate to
                            contact us via hotline +252615248934 or just email us
                            help@ourpaymentsystem.com
                        </Typography>
                        <CardHeader title='some helpfull resources'/>
                        <Typography variant='h6'>
                        <Link >how you will use my information?</Link>
                       
                        </Typography>
                        <Typography variant='h6'>
                        <Link >will my documents be saved in your servers?</Link>
                       
                        </Typography>
                        <Typography variant='h6'>
                        <Link >what if i can't access my mobile number?</Link>
                       
                        </Typography>
                        
                       <CardContent>
                          
                           <Typography variant='h6'>
                           <CardHeader title='downloadble resources'/>
                           <Box sx={{
                            display:'flex',
                            
                            alignItems:'center'
                        }}>
                        <Typography variant='h6'>
                           <Link>user guide</Link>
                         </Typography>
                         <Download />
                        </Box>
                        <Box sx={{
                            display:'flex',
                            
                            alignItems:'center'
                        }}>
                        <Typography variant='h6'>
                           <Link>Terms of use</Link>
                         </Typography>
                         <Download />
                        </Box>
                        <Box sx={{
                            display:'flex',
                            
                            alignItems:'center'
                        }}>
                        <Typography variant='h6'>
                           <Link>cookies we use</Link>
                         </Typography>
                         <Download />
                        </Box>
                       
                        </Typography>
                       </CardContent>
                        
                     </CardContent>
                     <CardActions>
                         <Button onClick={()=>{
                             setagreementtaccepted(true)
                             cookies.set('agreementaccespted',true)
                             

                         }} color='primary' variant='contained'>Accept and continue </Button>
                         <Button  color='secondary' variant='contained'>dont't accept and contact us</Button>
                     </CardActions>
                </Card>
              
            </Box>
        </Box>
        <Box sx={{
          flex:1,
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
            <img src={process} width='90%'/>
        </Box>

    </Box>
  )
}
