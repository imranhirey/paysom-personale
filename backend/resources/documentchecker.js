const detectlabels = require("../aws/detectlablels");
// let isdocument = async () => {
//   let documentwithoutfacescore = 0;
//   let isdocumentwithoutface = false;
//   let documentwithfacescore = 0;
//   let isdocumentwithface = false;

//   let labels = [];
//   detectlabels()
//     .then((x) => {
//       console.log(x);
//       x.map((x) => {
//         labels.push(x.name);
//       });
//     })
//     .then(() => {
//       labels.map((x) => {
//         if (x == "Text" || x == "Document" || x == "Id Cards") {
//           documentwithoutfacescore = documentwithoutfacescore + 1;
//           console.log(documentwithoutfacescore)
//         } else {
//           documentwithoutfacescore = documentwithoutfacescore;
//         }
//       });
//     })
//     .then(() => {
//       if (documentwithoutfacescore < 2) {
//         isdocumentwithoutface = isdocumentwithoutface;
//       } else {
//         isdocumentwithoutface = true;
//       }
//     })
//     .then(() => {
//       labels.map((x) => {
//         console.log(x)
//         if (x == "Human" || x == "Person") {
//           documentwithfacescore = documentwithfacescore + 1;
//         } else {
//           documentwithfacescore = documentwithfacescore;
//         }
//       });
//     })
//     .then(() => {
//       if (documentwithfacescore > 1) {
//         console.log('faceka',documentwithfacescore)
//         isdocumentwithface = true;
//       } else {
//         console.log('faceka2',documentwithfacescore)
//         isdocumentwithface = isdocumentwithface;
//       }
//     });
//   if (isdocumentwithoutface && isdocumentwithface) {
//     return 2;
//   } else if (isdocumentwithoutface && !isdocumentwithface) {
//     return 1;
//   } else {
//     console.log(
//       documentwithoutfacescore,
//       isdocumentwithoutface,
//       documentwithfacescore,
//       isdocumentwithface
//     );
//     return 0;
//   }
// };

// // isdocument().then((x) => {
// //   console.log(x);
// // });

// module.exports = isdocument;

// // document checker an other try while the first try is fieled
let isdocument = async (filename) => {
  let isdocumentwithfacescore = 0;
  let isdocumentwithoutfacescore = 0;
  let result = null;

  await detectlabels(filename).then((labels) => {
    labels.map((x) => {
      if (
        x.name == "Document" ||
        x.name == "Passport" ||
        x.name == "Id Cards"
      ) {
        isdocumentwithoutfacescore = isdocumentwithoutfacescore + 1;
      } else {
        isdocumentwithoutfacescore = isdocumentwithoutfacescore;
      }
      if (x.name == "Human" || x.name == "Person") {
        isdocumentwithfacescore = isdocumentwithfacescore + 1;
      } else {
        isdocumentwithfacescore = isdocumentwithfacescore;
      }
    });

    if (isdocumentwithfacescore == 0 && isdocumentwithoutfacescore == 0) {
      result = 0;
    } else {
      if (isdocumentwithfacescore >= 2 && isdocumentwithoutfacescore >= 2) {
        result = 1;
      } else {
        if (isdocumentwithfacescore == 0 && isdocumentwithoutfacescore > 0) {
          result = 0.5;
        } else {
          result = 2;
        }
      }
    }
  });
  return result; // 1 good document 0 bad document 0.5 good document but face not detected 2 only face detected
};

module.exports=isdocument