let link = "https://www.imdb.com/chart/top/"
const request = require("request")
const fs = require("fs")

const cheerio = require("cheerio")
request(link, cb);
function cb(error, response, data) {
    //console.log(data)
    //fs.writeFileSync("./imdb.html", data)
    movies(data)
}
function movies(data) {
    let htmlkadata = fs.readFileSync("./imdb.html", "utf8")

    let myDocument = cheerio.load(htmlkadata)

    let moviesTables = myDocument(".chart.full-width");
    //fs.writeFileSync("./moviesTable.html" ,moviesTables +" " )
    // console.log(moviesTables.length)
    let table = myDocument(moviesTables[0])
    let alltablerows = table.find("tbody tr")
    let content=[];
    for (let i = 0; i < alltablerows.length; i++) {
        let alltds = myDocument(alltablerows[i]).find(" td")
        let moviename = myDocument(alltds[1]).find("a").text();
        let rating = myDocument(alltds[2]).find("strong").text();
        // content.push({moviename : rating})
        content.push(moviename , rating)

    }
    //var myJsonString = JSON.stringify(yourArray);
    // console.log(content)
    var myJSON = JSON.stringify(content);
    fs.writeFileSync("./thing.json", myJSON);
}