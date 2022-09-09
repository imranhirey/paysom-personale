import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import {
  Navigate,
  Router,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { Usercontext } from "../../contexts/Usercontext";
import resourses from "../../features/resouces";
import Sidebar from "../Sidebar";
import Areyousure from "./popups/Areyousure";

const Subscribtions = () => {
  let [user, setuser] = useContext(Usercontext);
  let [subscribtions, setsubscribtions] = React.useState([]);
  let [newsub, setnewsub] = React.useState(null);
  let [subowner, setsubowner] = React.useState(null);
  let [open, setopen] = React.useState(false);

  // get the query params from the url
  const { search } = useLocation();
  // parse the query params
  const queryParams = new URLSearchParams(search);
  let subid = queryParams.get("subid");

  // get the value of the query param
  // get the url without the query params
  const url = useLocation().pathname;
  let navigae = useNavigate();

  let getsubprovider = async () => {
    axios
      .post("http://144.126.252.62:5500/subscriptions/getsubowner", {
        sub_id: subid,
      })
      .then((res) => {
        if (res.data.status == "error") {
          // navigaete to error page
          navigae(url);
          setopen(false);
        } else {
          setopen(true);
          setsubowner(res.data.owner);
        }
      });
  };

  // verify the token
  // if token is valid, then redirect to the payment page
  // else redirect to the login page
  useEffect(() => {
    let Res = new resourses();
    Res.getsubscription(user.subscribtions).then((res) => {
      console.log(res);
      setsubscribtions(res.data.subscriptions);
    });
  }, []);
  useEffect(() => {
    axios
      .post("http://144.126.252.62:5500/subscriptions/get", {
        sub_id: subid,
      })
      .then((res) => {
        console.log(res.data?.subscription);
        setnewsub(res.data?.subscription);

        getsubprovider();
      });
  }, []);

  // get the object keys of newsub
  let handlesubscribe = async() => {
  let data={

    sub_id:subid,
    user:user.cus_id
  }
  console.log(data)
  let Res = new resourses();
    Res.startsubscribtion(data).then((res) => {
      console.log(res);
     
    window.location.replace('http://144.126.252.62:3000/subscribtions')
    })
    .catch((err)=>{
      console.log(err)
    }
    )
  };

  return (
    <Sidebar>
      {open && (
        <Areyousure
          oktitle="subscribe"
          open={open}
          setopen={setopen}
          handleaction={() => {
            handlesubscribe();
          }}
          closetitle="cancel"
          bodytext={`${subowner?.businessname} will recharge your account for $${newsub?.sub_amount}  untill you cancel the subscribtion -- subscribtion type: ${newsub?.type} -- subscribtion id: ${newsub?.sub_id}`}
          open={true}
          headingtext="Are you sure you want to subscribe"
        />
      )}
      <div
        style={{
          width: "100%",
          height: "100%",
        }}>
        {subscribtions?.map((sub) => (
          <div style={{
            margin:"10px"
          }} key={sub.sub_id}>
            <div
              style={{
                width: "700px",
                height: "150px",
                backgroundColor: "#fafafa",
                borderRadius: "10px",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100%",
                  backgroundColor: "#f2f2f2",
                  borderRight: "2px dashed black",
                  borderRadius: "10px 0px 0px 10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <h5
                  className="rotate"
                  style={{
                    fontSize: "16px",

                    color: "black",
                    writingMode: "vertical-rl",
                  }}
                >
                  {sub.sub_created_by.bussiness_number}
                </h5>
                <h6>-</h6>
              </div>
              <div>
                <Card
                  style={{
                    width: "600px",
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <h5>{sub.sub_name}</h5>
                    <h5>expires on -{sub.sub_start_date.slice(0, 10)}</h5>
                    <h5>price - ${sub?.sub_amount}</h5>
                    --- {sub.type} ---
                  </CardContent>
                  <CardActionArea
                    style={{
                      display: "flex",
                      alignSelf: "center",
                      marginLeft: "130px",
                    }}
                  >
                    <img src={sub.sub_qr_code} width='200px'/>
                    
                  </CardActionArea>
                  
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};

export default Subscribtions;
