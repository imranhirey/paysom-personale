import { useContext, useState } from "react";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import logo from '../images/diu-logo.png'
import rocket from "../images/rocket.gif";
import login from "../images/login.svg";
import { Formik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import * as moment from 'moment'
import Terms from "./Terms";
import { ArrowForward, Dangerous, WrongLocation } from "@mui/icons-material";
import Appinputfield from "./reusable/Appinputfield";
import resourses from "../features/resouces";
import axios from "axios";
import { Usercontext } from '../contexts/Usercontext';
export default function Register() {
  let [user,setuser]=useContext(Usercontext)
  console.log(user)
  
  let [currentsteps, setcurrentsteps] = useState(0);
  let [errormessage,seterrormessage]=useState('')
 

  let fields = [
    { label: "Enter your full name", name: "fullname", value: "" },
    { label: "Enter your email", name: "email", value: "" },
    { label: "Birthdate", name: "birthdate", value: "" },
    { label: "Phone number", name: "phonenumber", value: "" },
    { label: "Enter Your Password", name: "password1", value: "" },
    { label: "Confirm your password", name: "password2", value: "" },
  ];
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let navigate = useNavigate();
  let validationSchema = yup.object({
    fullname: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(40)
      .min(5)
      .required(),
    email: yup
      .string()
      .email("please enter email address")
      .required("this field is required"),
    birthdate: yup.string().required("this field is required").test(
      "DOB",
      "you must be atleast 18 years to register ",
      (date) => moment().diff(moment(date), "years") >= 18
    ),
    phonenumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required(),
    password1: yup
      .string()
      .required("this field is required")
      .min(6, "your password should be greater than 6"),
    password2: yup
      .string()
      .oneOf([yup.ref("password1"), null], "Passwords must match"),
  });

  // handlers
  let handletype=(name)=>{
    if(name==='password1' || name==='password2'){
      return 'password'
    }
    else if(name==='birthdate'){
      return 'date'
    }
    else{
      return ''
    }

  }
  let handleregister=async(values)=>{
    let Resourses = new resourses();
                    Resourses.email = values.email;
                    Resourses.phonenumber = values.phonenumber;
                    let res = await Resourses.getverificationlink();
                    let link = res.link;
                    let p=9
                    let resp= await axios.post('http://localhost:4000/register',{user:values})
                     console.log(resp.data.msg)
                    if (resp.data.msg==='sorry user with this email already exist'){
                     seterrormessage('sorry user with this email already exist')
                    }
                    else if (resp.data.msg==='sorry user with this number already exist'){
                      seterrormessage('sorry user with this number already exist')

                    }
                    else{
                      
                     console.log('haaay')
                     console.log(user)
                     console.log(resp.data.user)
                      let number=resp.data.user.number
                      let email=resp.data.user.email

                      console.log('bilaabmay ..')
                      let Resources= new resourses()
                      Resources.phonenumber=number
                      Resources.email=email
                      let token= await Resources.getverificationlink()
                      navigate('/verify/'+token.link)
                      
                      

                    }
  }
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",

          paddingBottom: "20px",
          flexDirection: "row",

          alignItems: "center",
        }}
      >
        
        <Box
          sx={{
            width: "90%",
            height: "80%",
            flex: 2,

            borderRadius: "14px",
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
          <Box
            sx={{
              fontWeight: "bold",
              fontSize: "34px",
              marginTop: "15px",
              width: "70%",
            }}
          >
            <img alt="ekulmis logo" src={logo} width="200px" />

            <Typography
              color="ButtonText"
              sx={{ fontWeight: "450", fontSize: "34px", marginBottom: "30px" }}
            >
              {" "}
              Let's get started{" "}
              <img alt="rocket svg " width="40px" src={rocket} />
            </Typography>
            {errormessage && <Alert icon={<Dangerous/>} color='error'>
                        <AlertTitle typeof='error'>{errormessage?errormessage:''}</AlertTitle>
                      </Alert>}
            {currentsteps !== 4 && (
              <>
                <Formik
                  onSubmit={(values)=>handleregister(values)}
                  validationSchema={validationSchema}
                  initialValues={{
                    fullname: "",
                    email: "",
                    phonenumber: "",
                    birthdate: "",
                    password1: "",
                    password2: "",
                  }}
                >
                  {(formik) => (
                    
                    <form onSubmit={formik.handleSubmit}>
                      {fields.map((f) => (
                        <Appinputfield
                          type={handletype(f.name)}
                          key={f.name}
                          onchange={formik.handleChange}
                          id={f.name}
                          value={formik.values[`${f.name}`]}
                          label={f.name === "birthdate" ? "" : f.label}
                          error={
                            formik.touched[`${f.name}`] &&
                            Boolean(formik.errors[`${f.name}`])
                          }
                          helperText={
                            formik.touched[`${f.name}`] &&
                            formik.errors[`${f.name}`]
                              ? formik.errors[`${f.name}`]
                              : ""
                          }
                        />
                      ))}
                      <Button
                        type="submit"
                        endIcon={<ArrowForward />}
                        sx={{
                          marginTop: "20px",
                        }}
                        fullWidth
                        variant="contained"
                      >
                        Continue
                      </Button>
                      
                    </form>
                    
                  )}
                </Formik>
                
              </>
              
            )}

            <Box
              sx={{
                display: "flex",
                marginTop: "7px",
              }}
            >
              <Button>Already have account?</Button>
              <Button onClick={()=>{
                 window.location.replace('/login')
              }} size="small" color="secondary">
                Sign in
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: { xs: "none", sm: "none", md: "flex" },
            flex: 1.5,
            justifyContent: "center",
          }}
        >
          <img alt="svg animation " src={login} />
        </Box>
       
        <Terms />
      </Box>
    </>
  );
}
