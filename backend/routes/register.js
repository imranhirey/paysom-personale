const express = require("express");
const { isDate } = require("moment");
const router = express.Router();
let connectdatabase = require("../database/dbconnect");
let User = require("../database/schemas/regstrationSchema");
const createcustomer = require("../payments/createcustomer");
connectdatabase;

function makeid(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
router.post("/", async (req, res) => {
  console.log("hello");
  console.log(req.body.user);
  let { fullname, email, phonenumber, password1, birthdate } = req.body.user;
  let checkemail = await User.findOne({ email: email });
  let checknumber = await User.findOne({ phone_number: phonenumber });

  if (checkemail || checknumber) {
    res
      .json({
        msg: checkemail
          ? "sorry user with this email already exist"
          : "sorry user with this number already exist",
      })
      .status(401);
  } else {
    let userka = {
      name: fullname,
      email: email,
      phone: phonenumber,
    };
    let getuser = await createcustomer(userka);
    console.log(getuser);

    let user = new User({
      name: fullname,
      cus_id: getuser.id,
      contacts:[],
      email: email,
      phone_number: phonenumber,
      password: password1,
      birthdate: birthdate,
      security: {
        accesstoken: "",
        refreshtoken: "",
      },
      finanaces: {
        blance: 0,
        acc:makeid(10),
        requests: [],
        transactions: [],
        payment_methods: [],
      },
      refrences: {
        emailverified: false,
        numberverified: false,
        identityverified: false,
        otp: null,
        two_step_verification: false,
        logged: false,
      },
    });

    try {
      user.save();
      res.json({
        user: {
          name: user.name,
          number: user.phone_number,
          refrences: user.refrences,
          email,
        },
        msg: "ok",
      });
    } catch (error) {
      res.status(500);
    }
  }
});

module.exports = router;
