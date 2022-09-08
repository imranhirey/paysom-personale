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
import verify from "../../../images/document.svg";
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
export default function Documentverification({setdocumentverified}) {
  let [verificationstarted, setverificationstarted] = useState(false);
  let [verified, setisverified] = useState(false);
  let [error, seterror] = useState("");

  let params = useParams();
  let [filename, setfilename] = useState("");
  let [file, setfile] = useState("");
  let fileref = React.useRef(null);

  useEffect(() => {
    let retrivetheuser = async () => {
      let token = params.id;
      let Res = new resourses();
      Res.token = token;
      let user = await Res.retriveuserbytoken();
      console.log(user.data.user.data.phone_number);
    };

    
  }, []);
  let handlechanche = () => {
    setfile(fileref.current.files[0]);
    setfilename(fileref.current.value);
    seterror(null)
    console.log(fileref.current.files[0]);
  };
  let checkdocument = async() => {
    console.log('i am ok')
    let filee=fileref.current.files[0]
    let filenamee=fileref.current.files[0].name
    const formdata= new FormData()
    setverificationstarted(true);
    
    formdata.append("file",filee)
    formdata.append("filename",filenamee)
   try {
    const res = await axios.post(
      "http://localhost:4000/upload",
      formdata
    );
    let code= res.data.code
  
   if (code!==1){
    seterror('error')
   }
   else{
     setisverified(true)
     seterror("")
     setTimeout(() => {
      setdocumentverified(true)
       
     }, 2000);
   }

    
   } catch (error) {
     console.log(error)
     
   }
   setverificationstarted(false);
  };

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
            width: { xs: "90%", sm: "90%", md: "50%" },
          }}
        >
          {verified && 
          <Alert severity='success'>sucess redrecting to faceverification page ...</Alert>

         }{error && 
          <Alert severity='warning'>{filename.slice(12)} is not valid document please check it again</Alert>

         }
          <CardHeader
            translate="yes"
            title="step 3 upload your passport / NID"
          />
          {verificationstarted && <LinearProgress />}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              accept="image/*"
              onChange={handlechanche}
              ref={fileref}
              type="file"
              id="file"
            />

            <label
              style={{
                cursor: "pointer",
              }}
              htmlFor="file"
            >
              <AddBox
                sx={{
                  fontSize: "90px",
                  color: "dodgerblue",
                }}
              />
            </label>
          </Box>

          <CardActionArea>
            <CardActions>
              <LoadingButton
              color={verified?'success':'info'}
                sx={{
                  borderRadius: "15px",
                }}
                onClick={() => {
                  checkdocument();
                }}
                variant="contained"
                loading={verificationstarted}
                startIcon={verificationstarted ? null : <Check />}
                fullWidth
              >
                {verificationstarted ? "Checking" :verified?'successfully verified':'check'}
              </LoadingButton>
             
            </CardActions>
            
          </CardActionArea>
        
          {filename && (
            <>
              <CardContent>
                <p>
                  <p style={{
                    color:'red'
                  }}>important</p>invalid documents will be deleted immidiately after checking it and we consider that {filename.slice(12)} is your property and we will use this document only
                  for verification purpose we will not share with other third
                  parties without your concern . <a href="#">see more</a>
                </p>
              </CardContent>
            </>
          )}
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
