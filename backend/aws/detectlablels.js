///
const AWS = require("aws-sdk");
require('dotenv').config()
let fs = require("fs");
let getkeys=require('../config')


const config = new AWS.Config({
  credentials:{
    accessKeyId:'AKIAUYIO7HOVPG7HTEPR',
    secretAccessKey:'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',
    
  },

  region: "us-east-1",
});

let detectlabels = async (filename) => {
  let labels = [];
  console.log("hi");
  let file = `./files/${filename}`;
  console.log(file)
  const bitmap = fs.readFileSync(file);
  const buffer = new Buffer.from(bitmap, "base64");

  const client = new AWS.Rekognition(config);

  let params = {
    Image: {
      Bytes: buffer,
    },
  };
  await client
    .detectLabels(params, (err, res) => {
      if (err) {
        console.log(err);
      }
      res.Labels.map((x) => {
        if (x.Confidence < 90) {
          labels = labels;
        } else {
          labels.push({ name: x.Name, confidence: x.Confidence });
        }
      });
      
    }).promise()
    return labels
   
 

   
};
module.exports=detectlabels

