const puppeteer = require("puppeteer");
const id="https://www.google.com/maps/@28.7395331,77.11403,15z"
const pw="Querty1@"
let tab;
let idx;
let gCode;
// puppeteer has promisfied functions
// by default headless = true
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
    return tab.goto("https://www.google.com/maps/@28.7395331,77.11403,15z");
  })
  .then(function(){
      return tab.click(
          ".gb_7f.gb_h "
          //login ho jata hai
      );
  })
//   .then(function () {
//     return tab.type("#input-1", id);
//   })
//   .then(function () {
//     return tab.type("#input-2", pw);
//   })
//   .then(function () {
//     return tab.click(
//       ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
//     ); // login hojata hai click se
//   })