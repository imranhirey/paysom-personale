let stripetk='sk_test_51JR57rBuBMeuylpxvr07UaSS8EfkIztqkqzd9fWDTfKCqgC92I0vVDYCuMx29V5AJYLXiqnuGHdJWoYw7sSWG6yj00RoAASRop'
const stripe = require('stripe')(stripetk)


let imran=async()=>{
    let card= await createcard()
console.log(card)
}
imran()