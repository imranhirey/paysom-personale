import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  LinearProgress,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Usercontext } from "../../contexts/Usercontext";
import Sidebar from "../Sidebar";
import resourses from "../../features/resouces";
import Confirm from "./popups/Confirm";
import ConfirmSomething from "./popups/Confirm";
import { Snackcontext } from "../../contexts/Snackbarcontext";
import playsucess from "../../assets/success.mp3";
import playfail from "../../assets/fail.mp3";

import useSound from "use-sound";
import Swal from "sweetalert2";

export default function Recharge() {
  let [playSuccess] = useSound(playsucess);
  let [playFail] = useSound(playfail);
  let [message, setmessage] = useContext(Snackcontext);
  let [user, setuser] = useContext(Usercontext);
  let [ammount, setammount] = useState(0);
  let [loading, setloading] = useState(false);
  let [confirmopen, setconfirmopen] = useState(false);
  let dpm = null;
  user.finanaces.payment_methods.map((x) => {
    return x.card.metadata.default == "true" ? (dpm = x) : null;
  });

  console.log(user);
  let [error, seterror] = useState("");
  React.useEffect(() => {
    if (dpm == null) {
      seterror("please setup your default payment method");
    } else {
    }
  }, []);
  let handlerecharge = async () => {
    setconfirmopen(false);
    setloading(true);
    let Res = new resourses();
    let depositdata = {
      ammount: ammount,
      acc: user.finanaces.acc,
    };
    let res = await Res.deposit(depositdata);
    console.log(res.data.message);
    if (res.data.type === "error") {
      Swal.fire(res.data.message, "your transaction has been failed", "error");
      playFail();
      setloading(false);
    } else {
        console.log(res.data.message)
      Swal.fire({
        title: "Transcation Completed Successfully",
        text: "you have deopsited $" + ammount + " on your account",
        type: "success",
        icon: 'success',
  html:
    
    '<hr/>'+
    `name: <b>${user.name}</b>, ` +
    '<br>'+
    `amount deposited:<b>${ammount}USD</b>` +
    '<br>'+
    `amount deposited:${ammount}` +
    '<br>'+
    `<a download href=${res.data.message.receipt_url} class='button'>download</a>` 
       })
      playSuccess();
      setloading(false);
    }
  };
  function Recahrcheform() {
    return (
      <>
        {error && (
          <>
            {" "}
            <Alert severity="error">{error}</Alert>
          </>
        )}
        <TextField
          sx={{
            margin: "12px",
          }}
          disabled
          label="account Number"
          value={user.finanaces.acc}
          placeholder="Your Account Number"
        />
        <TextField
          sx={{
            margin: "12px",
          }}
          disabled
          label="account Name"
          value={user.name}
          placeholder="Your Account Name"
        />
        <TextField
          sx={{
            margin: "12px",
          }}
          disabled
          label="Default Payment Method"
          value={
            dpm != null
              ? "**** **** **** " + dpm.card.last4
              : "please setup your default payment method"
          }
          placeholder="Your Account Name"
        />
        <OutlinedInput
          sx={{
            margin: "12px",
            fontSize: "20px",
          }}
          id="outlined-adornment-amount"
          defaultValue={ammount}
          placeholder="Enter the amount"
          autoFocus={true}
          disabled={loading}
          onChange={(e) => setammount(e.target.value)}
          startAdornment={
            <InputAdornment sx={{}} position="start">
              <Typography
                sx={{
                  fontSize: "20px",
                }}
              >
                $
              </Typography>
            </InputAdornment>
          }
        />
      </>
    );
  }
  return (
    <Sidebar>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "57%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            background: "white",
            borderRadius: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              letterSpacing: "7px",
              marginBottom: "8px",
              margin: "12px",
            }}
          >
            TOP UP
          </Typography>
          <Recahrcheform />
          <ButtonGroup
            sx={{
              margin: "12px",
            }}
          >
            <Button onClick={() => setammount(5)}>$5</Button>
            <Button onClick={() => setammount(15)}>$15</Button>
            <Button onClick={() => setammount(30)}>$30</Button>
            <Button onClick={() => setammount(50)}>$50</Button>
            <Button onClick={() => setammount(100)}>$100</Button>
            <Button onClick={() => setammount(150)}>$150</Button>
            <Button onClick={() => setammount(200)}>$200</Button>
            <Button onClick={() => setammount(500)}>$500</Button>
            <Button onClick={() => setammount(1000)}>$1000</Button>
            <Button onClick={() => setammount(5000)}>$5000</Button>
          </ButtonGroup>
          {confirmopen && (
            <ConfirmSomething
              subtitle={
                "aftre recharging your account we will not be able to refund your Amount unless you gave an acceptable reason"
              }
              confirmopen={confirmopen}
              setconfirmopen={setconfirmopen}
              title={
                `Are You sure you want recharge your account with $` + ammount
              }
              handleaction={handlerecharge}
            />
          )}
          <Button
            onClick={async () => {
              setconfirmopen(true);
            }}
            sx={{
              margin: "9px",
            }}
            disabled={
              user.finanaces.payment_methods.length == 0 || loading || error
                ? true
                : false
            }
            variant="contained"
          >
            Deposit ${ammount}
          </Button>

          {user.finanaces.payment_methods.length <= 0 && (
            <Alert severity="error">
              please connect at least 1 payment method to recharge your wallet
            </Alert>
          )}
          {loading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: "200px",
            height: "60px",
            background: "dodgerblue",
            borderRadius: "20px",
            marginLeft: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: "white",
            }}
          >
            BLANCE: ${user.finanaces.blance}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "200px",
            height: "60px",
            background: "dodgerblue",
            borderRadius: "20px",
            marginLeft: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: "white",
            }}
          >
            Personal Account
          </Typography>
        </Box>
      </Box>
    </Sidebar>
  );
}
