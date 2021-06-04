const puppeteer= require("puppeteer");
const id="getekiw752@slowimo.com"
const pw="getekiw752@slowimo.com"
let tab;
let idx;
let browseopenpromise= puppeteer.launch({headless : false, defaultViewport: null , args:["--start - maximixed"]})
//Promise<Pending>
browseopenpromise.then(function(browser){
    // console.log(browseopenpromise)
    //console.log("browser is opened");
    return  browser.pages();
})
.then(function(pages){
    tab= pages[0];
    return tab.goto("https://www.hackerrank.com/auth/login")
})
// .then(function(){
//     console.log("open hackerank")
// })
.then(function(){
    return tab.type("#input-1", id );
})
.then(function(){
    return tab.type("#input-2" , pw)
}) 
.then(function(){
    return tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled")
})
// .then(function(){
//     return tab.waitForSelector("#base-card-1-link" , {visible : true})
// })
// .then(function(){
//     return tab.click("#base-card-1-link")//no node found for this selector
// })
// .then(function(){
//     return tab.waitForSelector('a[data-attr1="warmup"]', {visible : true})

// })
// .then(function(){
//     return tab.click('a[data-attr1="warmup"]')//no node found for this selector
// })
.then(function(){
    return waitandclick("#base-card-1-link");//make this function as promisified function
})
.then(function(){
    return waitandclick('a[data-attr1="warmup"]')
})
.then(function(){
    return tab.waitForSelector(".js-track-click.challenge-list-item")
})
.then(function () {
    // tab.$() // document.querySelector;
    return tab.$$(".js-track-click.challenge-list-item"); // it will run document.querySelectorAll in the browser and gives you array of all the elements
  })
  .then(function (allQuesArray) {
    // [<a /> , <a /> , <a /> , <a />];
    let allPendingPromises = [];
    for (let i = 0; i < allQuesArray.length; i++) {
      let oneATag = allQuesArray[i];
      let pendingPromise = tab.evaluate(function (element) { return element.getAttribute("href");}  , oneATag);
      allPendingPromises.push(pendingPromise);
    }
    // console.log(allPendingPromises)
    // [ Promise<Pending> , Promise<Pending> , Promise<Pending> , Promise<Pending> ];
    let allPromisesCombined = Promise.all(allPendingPromises);
    // Promise<Pending>
    return allPromisesCombined;
})
.then(function(allquestionlinks){
    let onequestionsolve= solveQuestions(allquestionlinks[0])
    return onequestionsolve;
})
.then(function(){

})
.catch(function(err){
    console.log(err)
})
function getcode(){
    return new Promise(function(scb, fcb){
        let waitPromise=tab.goto
    })
}

function solveQuestions(questionlink){
    return new Promise(function(scb,fcb){
        let gotopromise=tab.goto("https://www.hackerrank.com"+questionlink);
        gotopromise.then(function(){
            // console.log("reached first question")
            return waitandclick('div[data-attr2="Editorial"]')
        })
        .then(function(){
            return getcode();
        })
        .then(function(){
            console.log("get the code succesfully")


        })
        .catch(function(error){
            fcb(error); 
        })

    })
}
//wait n click
function waitandclick(selector){
    return new Promise(function(scb,fcb){
        let waitPromise= tab.waitForSelector(selector , {visible: true});
        waitPromise.then(function(){
            return tab.click(selector)
        })
        .then(function(){
            scb();
        })
        .catch(function(){
            fcb()
        })
    })
}


 