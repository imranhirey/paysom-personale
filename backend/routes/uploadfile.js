const express = require("express");
const router = express.Router();
let connectdatabase = require("../database/dbconnect");
let User = require("../database/schemas/regstrationSchema");
const isdocument = require("../resources/documentchecker");
var gutil = require('gulp-util');
let fs= require('fs').promises

connectdatabase;
let decidewithertodeleteornot=(code,filename)=>{
  if (code!==1){
    fs.exists('./files/'+filename, function(exists) {
      if(exists) {
        //Show in green
        console.log(gutil.colors.green('File exists. Deleting now ...'));
        fs.unlink('./files/'+filename);
      } else {
        //Show in red
        console.log(gutil.colors.red('File not found, so not deleting.'));
      }
    });

  }
  
}

router.post('/',async(req,res)=>{
    const newpath = './files/'
    
    
   
    const file = req.files.file;
    const filename = file.name;
    await file.mv(`${newpath}${filename}`, async(err) => {
        if (err) {
          console.log(err.message)
        }
       
       
        })
        let filen=filename
        toString(filen)
        console.log('magaca waa',filen)
        console.log(filen)
        console.log(filen ==='imran.jpg')
       setTimeout(() => {
        isdocument(filen).then((x)=>{
         if (x!==1){
          (async () => {
            try {
              await fs.unlink('./files/'+filename);
            } catch (e) {
              // file doesn't exist, no permissions, etc..
              // full list of possible errors is here 
              // http://man7.org/linux/man-pages/man2/unlink.2.html#ERRORS
              console.log(e);
            }
          })();
         }
          
          res.json({
            code:x
          })
          
        })
       }, 1000);
        
        
      
 
       
       
      
    
     



})
module.exports=router