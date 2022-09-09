const express = require("express");
const bodyparser = require("body-parser");
let refreshtoken = require("./resources/refreshtoken");
let fileupload = require("express-fileupload");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
app.use(fileupload());
app.use(express.static("files"));
let login = require("./routes/login");
let uuid = require("uuid");
let uploaddoc = require("./routes/uploadfile");
let register = require("./routes/register");
let users = require("./database/schemas/regstrationSchema");
let transactions = require("./database/schemas/TransactionsSchema");
const sendcode = require("./resources/sendcode");
const sendemailthroughemail = require("./sendcode_email");
const saveImage = require("./resources/uploadfilefrombase64");
const detectlabels = require("./aws/detectlablels");
let http = require("http");
let server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
app.use(
  cors({
    origin: "*",
  })
);

const addpaymenmethod = require("./payments/addpaymentmethod");
const assignpaymentmethodtouser = require("./payments/Asignuserpaymentmethod");
const removepaymentmethod = require("./payments/removepaymentmethod");
const deposit = require("./payments/deposit");
const sendmoney = require("./payments/sendmoney");
const { now } = require("mongoose");
const sendcodethroughemail = require("./sendcode_email");
const createtransaction = require("./payments/Createtransaction.js");
const addtomycontacts = require("./resources/addmycontacts");

app.get("/hellobro", (req, res) => {
  res.send("hi");
});
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyparser({}));
app.use("/login", login);
app.use("/register", register);
app.use("/upload", uploaddoc);
app.post("/verifytoken", (req, res) => {
  let token = req.body.data.token;

  setTimeout(async () => {
    try {
      let data = jwt.verify(token, "mysecret");
      let user = await users.findOne({ email: data.email });
      if (user) {
        res.json({
          data: data,
        });
      } else {
        res.status(401).json({
          data: "no user",
        });
      }
    } catch (error) {
      res.json({
        data: error.message,
      });
    }
  }, 1000);
});

function makeid(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
app.post("/retriveuserbytoken", async (req, res) => {
  let token = req.body.token;
  console.log("halkaanw axaa lagu soo dabacay", token);
  try {
    let user = jwt.verify(token, "mysecret");
    console.log("in jwt", user);
    let userka = await users.findOne({ email: user.email });
    console.log("in mongodb", userka);
    console.log(userka);
    res.json({
      data: {
        userka,
      },
    });
  } catch (error) {
    console.log("erroraa jiro", error.message);
    res.json({
      data: {
        user: null,
      },
    });
  }
});
app.post("/changevercode", (req, res) => {
  console.log("badloo aa bilaabay");
  let s = req.body;
  console.log("ssssss waaa ", s);

  let otp = makeid(6);
  console.log(otp);
  var myquery = { email: s.email };
  var newvalues = { $set: { refrences: { otp: otp } } };
  users.findOneAndUpdate(myquery, newvalues, (err, res) => {
    if (err) {
      console.log(err);
    }
    return "ok";
  });
  res.json({
    data: otp,
  });
});
app.post("/checkotp", async (req, res) => {
  let inputotp = req.body.otp;
  let user = req.body.user.data.data.userka;
  let userka = await users.findOne({ cus_id: user.cus_id });
  let requiredotp = userka.resources.oto;
  console.log(inputotp, requiredotp);
});

app.post("/sendverificationcode", async (req, res) => {
  let data = req.body.data;
  console.log(data);
  // email
  if (data.email) {
    let user = await users.findOne({ email: data.email });
    let haveotp = user.refrences.otp;
    if (haveotp == null) {
      console.log("generate otp");
      let otp = makeid(6);
      sendcodethroughemail(user.name, user.email, otp);
      //update the otp
      var myquery = { email: data.email };
      var newvalues = { $set: { refrences: { otp: otp } } };
      users.findOneAndUpdate(myquery, newvalues, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
      });
      // send the user by email or by phone
      res.json({
        otp,
      });
    } else {
      let otp = 123456;
      sendcodethroughemail(user.name, user.email, otp);
      res.json({
        otp,
      });
    }
  }
  if (data.number) {
    let user = await users.findOne({ phone_number: data.number });
    let haveotp = user.refrences.otp;
    if (haveotp == null) {
      console.log("generate otp with number");
      let otp = makeid(6);
      // send the user by number
      res.json({
        otp,
      });
    } else {
      let otp = user.refrences.otp;
      res.json({
        otp,
      });
    }
  }
});
app.post("/generate-verification-link", async (req, res) => {
  console.log("waa lii imaaday");
  let data = {
    email: req.body.data.email,
  };

  console.log("datada la xirayo marka la verify gareenayo  waa ", data);

  let token = jwt.sign(data, "mysecret", { expiresIn: "60m" });
  let link = "http://144.126.252.62:3000/" + token;
  console.log("link waa ", link);
  res.json({
    link: token,
  });
});
app.post("/uploadfaces", (req, res) => {
  let filename = saveImage(req.body.link);

  detectlabels("/faces/" + filename).then((x) => {
    let facescore = 0;
    x.map((n) => {
      if (n.name == "Face" && n.confidence > 99) {
        facescore = facescore + 1;
      } else {
        facescore = facescore;
      }
    });
    console.log(facescore);
    if (facescore == 1) {
      res.json({
        data: "ok",
      });
    } else {
      res.json({
        data: "notok",
      });
    }
  });
});
app.post("/refreshtoken", async (req, res) => {
  let token = req.body.token;
  if (token) {
    let resp = await refreshtoken(token);
    res.send(resp);
  } else {
    res.status(403).json("token must be profided");
  }
});
app.post("/addpm", async (req, res) => {
  let user = req.body.user.data.data.userka;
  if (user !== "undefined") {
    await addpaymenmethod(req.body.data, req.body)
      .then(async (data) => {
        await assignpaymentmethodtouser(data, user)
          .then((x) => {
            res.json({
              msg: "success",
            });
          })
          .catch((e) => {
            console.log("erroraa jiro", e.message);
            res.json({
              error: e.message,
            });
          });
      })
      .catch((e) => {
        console.log("in kudar method ", e.message);
        res.json({
          error: e.message,
        });
      });
  } else {
    console.log("user can not be retrived", user);
  }
});
app.post("/deposit", async (req, res) => {
  try {
    let resp = await deposit(req.body);
    res.json({
      type: "success",
      message: resp,
    });
  } catch (error) {
    res.json({
      type: "error",
      message: error.message,
    });
  }
});
app.post("/setdpm", async (req, res) => {
  // card_req= kaarka laga dihayo
  // card_db = kaarka laga dhigayo from db
  // user_req = userka from req
  // user_db = userka from db
  // pcard = kii horay u ahaa

  let user_req = req.body.user.data.data.userka; // user from request
  let user_db = await users.findOne({ cus_id: user_req.cus_id }); // user from database
  let card_req = req.body.card; // caarka laga dhigayo default from request
  let card_db = user_db.finanaces.payment_methods.find(
    (x) => x.id == card_req.id
  ); // // caarka laga dhigayo default from database
  let cards = user_db.finanaces.payment_methods;
  let kaarka = { cards };
  let index_of_card_db = cards.indexOf(card_db);
  // make the requested card true
  console.log("objectiga ", kaarka);
  let pcard = null;
  cards.map((x) => {
    return x.card.metadata.default == "true" ? (pcard = x) : null;
  });
  let indexpcard = cards.indexOf(pcard);

  if (pcard != null) {
    // ......... TESTING STAFF ...........
    //
    kaarka.cards[index_of_card_db].card.metadata.default = "true";
    //
    kaarka.cards[indexpcard].card.metadata.default = "false";

    // ........... END ....................
  } else {
    kaarka.cards[index_of_card_db].card.metadata.default = "true";
  }
  // check if there is previous default pm

  //update it => true->false
  var newvalues = { $set: { "finanaces.payment_methods": cards } };
  try {
    let resp = await users.findOneAndUpdate(
      { cus_id: user_req.cus_id },
      newvalues
    );
    res.json({
      msg: "succcessfully updated",
    });
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
  console.log(
    "after menapulation complete: origin=> ",
    kaarka.cards[index_of_card_db].card.metadata.default + " prefious=> ",
    kaarka.cards[indexpcard].card.metadata.default
  );
});

app.post("/sendmoney", async (req, res) => {
  let to_user = req.body.sendinfo.to_acc;
  let from_user = req.body.user.data.data.userka;
  if (from_user.cus_id == to_user.cus_id) {
    res.json({
      msg: "same",
    });
  } else {
    let fromuser = await users.findOne({ cus_id: from_user.cus_id });
    let touser = await users.findOne({ cus_id: to_user.cus_id });
    let fromuserblance = fromuser.finanaces.blance;
    let touserblance = to_user.finanaces.blance;
    let ammounttosend = req.body.sendinfo.ammount;
    let fromuserblance_after_detucting =
      parseInt(fromuserblance) - parseInt(ammounttosend);
    let touserblanceafteradding =
      parseInt(touserblance) + parseInt(ammounttosend);

    if (fromuserblance < ammounttosend) {
      res.json({
        msg: "error blance",
      });
    } else {
      let trx_info = {
        from_user,
        touser,
        ammounttosend,
      };
      let jawaab = await createtransaction(trx_info);
      console.log(jawaab);
      let jaw = await addtomycontacts(from_user, to_user);
      console.log("animals ", jaw);

      // update from user blance
      var myquery = { cus_id: from_user.cus_id };
      var newvalues = {
        $set: { "finanaces.blance": fromuserblance_after_detucting },
      };
      users.findOneAndUpdate(myquery, newvalues, (err, res) => {
        if (err) {
          return err.message;
        }
      });

      // update to user blance
      var myquery = { cus_id: to_user.cus_id };
      var newvalues = {
        $set: { "finanaces.blance": touserblanceafteradding },
      };
      users.findOneAndUpdate(myquery, newvalues, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
      });
    }
    let userblance = await users.findOne({ cus_id: to_user.cus_id });
    console.log("updating vie blance ", userblance.finanaces.blance);
    io.emit("updateblance" + touser.cus_id, {
      newblance: userblance.finanaces.blance,
    });
    // notify the the user that he has made a transaction
    res.json({
      msg: "success",
    });
  }
});
app.post("/findaccountinfo", async (req, res) => {
  let acc = req.body.acc;
  try {
    let user = await users.find({ "finanaces.acc": acc });
    res.json({
      msg: user,
    });
  } catch (error) {
    res.json({
      msg: "error",
    });
  }

  // let user=await users.findOne({'finan'})
});

app.post("/getmytrx", async (req, res) => {
  let cusid = req.body.cusid;
  let from = await transactions.find({ "from.cus_id": cusid });
  let to = await transactions.find({ "to.cus_id": cusid });
  let all_trx = {
    from,
    to,
  };
  res.json({
    data: all_trx,
  });
});
app.post("/rmpm", async (req, res) => {
  let id = req.body.data;
  let user = req.body.user.data.data.userka;
  if (user && id) {
    let resp = await removepaymentmethod(id, user);
    console.log(resp);
  } else {
    res.send({
      error: "error",
    });
  }
});

server.listen(4000);
