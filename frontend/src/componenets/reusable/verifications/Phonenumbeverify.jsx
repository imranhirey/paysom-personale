
import React, { useState, useEffect, useRef } from "react";

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
import verify from "../../../images/verifynumber.svg";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { DomainVerification, Check, Error } from "@mui/icons-material";
import resourses from "../../../features/resouces";
import { useSelector } from "react-redux";
export default function Phonenumbeverify({setnumberverified}) {
  let [verificationstarted, setverificationstarted] = useState(false);
  let [verificationcode, setverificationcode] = useState("");
  let [error, seterror] = useState("");

  let [number, setnumber] = useState("");
  let [email, setemail] = useState("");
  let params = useParams();
  let [usercode, setusercode] = useState("");
console.log('heey')
  useEffect(() => {
    let retrivetheuser = async () => {

      let token = params.id;
      console.log(token)
      let Res = new resourses();
      Res.token = token;
      let user = await Res.retriveuserbytoken();
      console.log(user.data.data.userka.phone_number)
      setnumber(user.data.data.userka.phone_number);
      setemail(user.data.data.userka.email);

    };

    retrivetheuser();
  }, []);
  useEffect(() => {
    let sendverificationcode = async () => {
      let Res = new resourses();
      Res.verificationtype = "number";
      Res.phonenumber = number;
      let code = await Res.sendverificationcode();
      console.log('codeka waa ',code)
      setverificationcode(code.otp);
    };
    sendverificationcode();
  }, [number]);

 

  let verifynumber = () => {
    setverificationstarted(true);
    let codeka = usercode;
    console.log(codeka);
    let ok = verificationcode == codeka;
    console.log('mayeey')
    setTimeout(async() => {
      if (ok) {
      console.log('kaalay')
        seterror("");

        setnumberverified(true)
        let Res = new resourses();
        Res.verificationtype = "email" 
        Res.email = email
        await Res.changevercode();
        setverificationstarted(false);
      } else {
        seterror("verification code is wrong!");
        setverificationstarted(false);
      }
    }, 3000);
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
          <CardHeader translate="yes" title="step 2 verify your number" />
          {verificationstarted && <LinearProgress />}

          <CardContent>
            <TextField
              onChange={(x) => setusercode(x.currentTarget.value)}
              disabled={verificationstarted}
              helperText={"we have sent 6 didgit code to your number " + number}
              fullWidth
              label="Enter the code here"
            />
            {error && (
              <Alert icon={<Error />} color="error">
                <AlertTitle typeof="error">{error}</AlertTitle>
              </Alert>
            )}
          </CardContent>

          <CardActionArea>
            <CardActions>
              <LoadingButton
                sx={{
                  borderRadius: "15px",
                }}
                onClick={() => {
                  verifynumber();
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
            {verificationcode && <Link>cant't get the code</Link>}
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
