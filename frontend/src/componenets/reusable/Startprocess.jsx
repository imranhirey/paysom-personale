import { Check, Download } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import process from '../../images/process.svg'
import processtext from '../../images/processtext.svg'
import { AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Verificationform from './Verificationform'
import Verification from './Verification'
import Phonenumbeverify from './verifications/Phonenumbeverify';
import Emailverify from './verifications/Emailverify'
import Agreement from './verifications/Agreement';
import { Cookies } from 'react-cookie';
import Documentverification from './verifications/Documentverification';
import Faceverification from './verifications/Faceverification';


export default function Startprocess() {
    let navigate=useNavigate()
    let cookies= new Cookies()
    let agreemnetaccepted= cookies.get('agreementaccespted')
    // agreement accepted
    let [agreementaccepted,setagreementtaccepted]=useState(agreemnetaccepted)
    let [emailverified,setemailverified]=useState(false)
    let [numberverified,setnumberverified]=useState(false)
    let [documentverified,setdocumentverified]=useState(false)
    let [faceverified,setfaceverified]=useState(false)
    let acceptagreement=!agreementaccepted
    let verifyemail=!emailverified && agreementaccepted
    let verifynumber=!numberverified && agreementaccepted && emailverified
    let verifydocument= !documentverified && numberverified && agreementaccepted && emailverified
    let verifyface=!faceverified && numberverified && agreementaccepted && emailverified && documentverified
    console.log(verifyface)
    console.log(verifydocument)
    console.log(verifynumber)
  if (acceptagreement){
    return  <Agreement setagreementtaccepted={setagreementtaccepted} />
  }
 
  if (verifyemail){
      return <Emailverify setemailverified={setemailverified}/>
  }
  if (verifynumber){

    return <Phonenumbeverify setnumberverified={setnumberverified}/>
}
if (verifydocument){
  return <Documentverification setdocumentverified={setdocumentverified}/>
}
if (verifyface){
  return <Faceverification setfaceverified={setfaceverified}/>
}
 
 window.location.replace('/login')
}
