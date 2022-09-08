import {
    Alert,
    AlertTitle,
    Box,
    Button,
    ButtonGroup,
    LinearProgress,
    InputAdornment,
    OutlinedInput,
    Typography,
    TextField

  } from "@mui/material";
  import React, { useContext, useState,useEffect } from "react";
  import { Usercontext } from "../../contexts/Usercontext";
  import Sidebar from "../Sidebar";
  import resourses from "../../features/resouces";
  import Confirm from "./popups/Confirm";
  import ConfirmSomething from "./popups/Confirm";
  import { Snackcontext } from "../../contexts/Snackbarcontext";
  import playsucess from "../../assets/success.mp3";
  import playfail from "../../assets/fail.mp3";
  import playaccount from "../../assets/account.mp3";
  import Fireotp from "./popups/Otp";
  import otpsent from '../../assets/otpsent.mp3'
  import {io} from 'socket.io-client'
  


  
  import useSound from "use-sound";
  import Swal from "sweetalert2";

  export default function Sendmoney() {
    let to_acc=''
    let [touser,settouser]=React.useState(null)
    let [playSuccess] = useSound(playsucess);
    let [Otpsent] = useSound(otpsent);
    let [playFail] = useSound(playfail);
    let [playaccountnumber]=useSound(playaccount)
    let [message, setmessage] = useContext(Snackcontext);
    let [user, setuser] = useContext(Usercontext);
    let [ammount, setammount] = useState(0);
    let [loading, setloading] = useState(false);
    let [confirmopen, setconfirmopen] = useState(false);
    let [otpneeded,setotpneeded]=useState(false)
 
   
    
    
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
    let sendvercode=async()=>{
      
      setTimeout(() => {
        Otpsent()
        console.log(Otpsent)
        setotpneeded(true)
        
        return null
      }, 4000);

    }
    let handleaccountchange=async(x)=>{
        setmessage('saving changes ')
        setloading(true)

        let Res= new resourses()
        let respond=await Res.finduseraccountinfo(x)
        if (respond.data.msg[0]==undefined){
          setloading(false)
          settouser({})
          seterror('could not found that account')
         
        }
        else{
          setloading(false)
          seterror('')
          settouser(respond.data.msg[0])

        }
       
    }
    let handlerecharge = async () => {
    
    
      setconfirmopen(false);
      setloading(true);

      let Res = new resourses();
      Res.email=user.email
    
      let senddatainfo = {
        ammount: ammount,
        to_acc:touser
      };
      let res = await Res.sendmoney(senddatainfo);
     
      
      console.log('send money res ',res.data);
      setloading(false)
      
      if (res.data.msg === "error blance" ||res.data.msg=='same' || res.data.msg=='success'  ) {
        let Res=new resourses()
        Res.email=user.email
        let ress=await Res.changevercode()
        
        if (res.data.msg=='same'){
          Swal.fire('you cant send money to your account', "your transaction has been failed", "error");
        playFail();
        setloading(false);

        }
        else if(res.data.msg=='success'){
          settouser(null)
        Swal.fire({
          title: "Transcation Completed Successfully",
          text: "you have sent $ 54 to "+touser.name,
          type: "success",
          icon: 'success',
    html:
      
      '<hr/>'+
      `name: <b>${user.name}</b>, ` +
      '<br>'+
      `amount deposited:<b>${ammount}USD</b>` +
      '<br>'+
      `amount deposited:${ammount}` +
      '<br>'
     
         })
        playSuccess();
        setloading(false);
        }
        else{
          Swal.fire('you dont have suffiecent blance to send ', "your transaction has been failed", "error");
        playFail();
        setloading(false);
        setTimeout(() => {
          window.location.reload()
        }, 3000);
        }
        
      } 
      
      
    };
    function Recahrcheform() {
      return (
        <>
        {otpneeded &&<Fireotp handleaction={()=>{
          setotpneeded(false)

          setloading(false)
          handlerecharge()
        }} open={otpneeded} setopen={setotpneeded}/>}
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
              label="account acc"
              disabled={loading}
              required
              defaultValue={touser?touser?.finanaces?.acc:''}
              onChange={(e)=>{
                  to_acc= e.target.value
                  if (to_acc.length==10){
                      handleaccountchange(e.target.value)
                  }
              }}
             
              
            
            placeholder="Your Account Number"
          />
          <TextField
            sx={{
              margin: "12px",
            }}
            disabled
            label="account Name"
            value={touser?touser?.name:'Account name'}
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
        autoFocus
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
              SEND MONEY
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
                  `Are You sure you want send $` + ammount+ ' to'+touser.name
                }
                handleaction={async()=>{
                  setconfirmopen(false)
                  setloading(true)
                  await sendvercode()
                 
                 
                  
                }}
                  
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
                user.finanaces.payment_methods.length == 0 || loading || error || touser==null
                  ? true
                  : false
              }
              variant="contained"
            >
              Send ${ammount}
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
  