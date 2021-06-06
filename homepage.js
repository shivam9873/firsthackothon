const puppeteer = require("puppeteer");
const id = "getekiw752@slowimo.com"
const pw = "getekiw752@slowimo.com"
let tab;
let idx;
let gCode;
let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});
browserOpenPromise.then(function (browser) {
    console.log("browser is opened !");
    return browser.pages();
})
    .then(function (pages) {
        tab = pages[0];
        return tab.goto("https://www.imdb.com/chart/top/");
    })
    .then(function () {
        return waitAndClick("._3x17Igk9XRXcaKrcG3_MXQ.navbar__user.UserMenu-sc-1poz515-0.eIWOUD .ipc-button__text");
    })
    .then(function () {
        return waitAndClick(".auth-provider-text");
    })
    // .then(function () {
    //     return waitAndClick("#signInSubmit");
    // })
    .then(function () {
        return tab.waitForSelector(".a-input-text.a-span12.auth-autofocus.auth-required-field", {
          visible: true,
        });
      })
    .then(function(){
        return tab.type("#ap_email", id);
    })
    .then(function(){
        return tab.type("#ap_password", pw);
    })
    .then(function () {
        return waitAndClick("#signInSubmit");
    })
    .then(function () {
        // tab.$() // document.querySelector;
        return tab.$$("signInSubmitm"); // it will run document.querySelectorAll in the browser and gives you array of all the elements
      })

function waitAndClick(selector) {
    return new Promise(function (scb, fcb) {
        let waitPromise = tab.waitForSelector(selector, { visible: true });
        waitPromise
            .then(function () {
                return tab.click(selector);
            })
            .then(function () {
                scb();
            })
            .catch(function () {
                fcb();
            });
    });
}
