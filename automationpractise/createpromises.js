let fs= require("fs")
function mypromisifiedfun(filepath){
    return new Promise(function(scb, fcb){
        //async function
        fs.readFile(filepath , function(error ,data){
            if(error){
                fcb("data nhi aaaaya ");
            }
            else{
                scb("testing success callback") 
            }
        })
    }) // it will create a new promise object!!
}
let pendingpromise= mypromisifiedfun("./f1.txt")
// pendingpromise.then(function(data){
//     console.log(data+ " ")
// })
// pendingpromise.catch(function(error){
//     console.log(error)
// })
pendingpromise.then(scb)
pendingpromise.catch(fcb)
function scb(data){
    console.log(data+ "")
}
function fcb(error){
    console.log(error)
}
