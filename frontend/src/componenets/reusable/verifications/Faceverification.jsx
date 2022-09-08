
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  LinearProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import verify from "../../../images/face.svg";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import {
  DomainVerification,
  Check,
  Error,
  Upload,
  CloudUpload,
  PlusOne,
  UploadFile,
  AddBox,
} from "@mui/icons-material";
import resourses from "../../../features/resouces";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";

export default function Faceverification({setfaceverified}) {
  let [verificationstarted, setverificationstarted] = useState(false);
  let [error, seterror] = useState("");
  let [faceverified, settfaceverified] = useState(false);



  let [imagesrc, setimagesrc] = useState("");
  let params = useParams();
  let [usercode, setusercode] = useState("");
  const videoConstraints = {
    width: 700,
    height: 400,
    facingMode: "user"
  };
  
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    
    () => {
      setverificationstarted(true)
      const imageSrc = webcamRef.current.getScreenshot();
      setimagesrc(imageSrc)
      console.log(imageSrc)
      axios.post('http://68.183.246.197:4000/uploadfaces',{link:imageSrc})
      .then((x)=>{
        if (x.data.data!='ok'){
          seterror('please face the camera correctly')
          setimagesrc(null)
          setverificationstarted(false)
        }
        else{
          seterror('')
          setverificationstarted(false)
          settfaceverified(true)
          setfaceverified(true)

          
          

        }


      })
    },
    [webcamRef]
  );
 

  useEffect(() => {
    let retrivetheuser = async () => {
      let token = params.id;
      let Res = new resourses();
      Res.token = token;
      let user = await Res.retriveuserbytoken();
    };

    retrivetheuser();
  }, []);
  

 

  
  
  return (
    <Box
      className="verification "
      sx={{
        width: "100vw",
        height: "100vh",
        background: "secondary",
        display: "flex",
      }}
    >
      
      <Box
        className="verification form "
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <Card
          sx={{
            width: { xs: "100%", sm: "100%", md: "70%" },
          }}
        >
           {faceverified && <Alert>Great you have sucessfully registered your face now redrecting you to login page  </Alert>}
            {error && (
              <Alert icon={<Error />} color="error">
                <AlertTitle typeof="error">{error}</AlertTitle>
              </Alert>
            )}
          <CardHeader title="step 4 verify your facial" />
          {verificationstarted && <LinearProgress />}

          <CardContent>
         
         
         <Box sx={{}}>
         {!imagesrc && <Webcam
        audio={false}
        
        
       
        ref={webcamRef}
        screenshotFormat="image/jpeg"
       
        videoConstraints={videoConstraints}
      />}
      {verificationstarted && <Typography variant="h4" sx={{
        position:'relative',
        left:'250px',
        bottom:'-390px',
        fontWeight:'400'
        
        
      }}>verifying ..</Typography>}
      {imagesrc && <img src={imagesrc} style={{
        opacity:0.5
      }} width='700px' height='400px'/>}
       
         </Box>
        
          </CardContent>

          <CardActionArea>
            <CardActions>
              <LoadingButton
                sx={{
                  borderRadius: "15px",
                }}
                onClick={() => {
                  capture()
                }}
                variant="contained"
                loading={verificationstarted}
                startIcon={verificationstarted ? null : <Check />}
                fullWidth
              >
                {verificationstarted ? "Checking" : "Verify"}
              </LoadingButton>
            </CardActions>
          </CardActionArea>
          <CardContent>
           
          </CardContent>
        </Card>
      </Box>
      <Box
        className="verification details"
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          className="verification details image"
          sx={{
            padding: "12px",
          }}
        >
          <img width="90%/>" src={verify} />
        </Box>
      </Box>
    </Box>
  );
}
