// const namess = "abdulaziz hassan kehinde";
// console.log(namess);

// //ASYNCHRONOUS
//GETTING MODULES
const fs = require("fs");
const ws = require("http");
const path = require("path");
const url = require("url");
const slug = require("slugify");
//calling the external module
const changeOver = require("./ExternalModule/externalModule");
// const read = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(read);

// const data = `WRITTEN BY ABDULAZIZ HASSAN KEHINDE \n ${read}`;
// fs.writeFileSync("./txt/hassan.txt", data);
// console.log("SUCCESSFULLY WRITTEN!!");
// 2;
//asynchronous and synchronous in node js
//this above is synchronous or blocking which means it has to wait forone line to be executed before the other lines can de executed
//while asynchronous or non blocking does not wait for the block to be executed instead it operates on the block in the background
//and doing asynchronous in node js can only be executed by using call back functions so lets see an eaxample using file

// fs.readFile("./txt/start.txt", "utf-8", function (error, data) {
//   //the error is used for error handling while the data represents the data that is passed
//   console.log(data);
//   //we can also use asynchronous when we want to use y=the previously gottten data
//   fs.readFile(`./txt/${data}.txt`, "utf-8", function (error, data1) {
//     console.log(data1);

//     fs.writeFile(
//       "./txt/asyncwrite.txt",
//       `this is the asyncwrite\n ${data}\n ${data1}\n`,
//       function (err) {
//         console.log("DONE!!!");
//       }
//     );
//   });
// });

// console.log("HELLO MIJO");
//now using asynchronous which one do you think will run frst
//seeing the result in the console  the log ran first because the file syatem is carried out in the background cause of the time it takes
//
//CREATING A SIMPLE WEB SERVER

//now lets create a simple api that is getting the data from the dev-data
//using the __dirname is much easier than using the .as it picks up the current directory we are working in
const jData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
//and now to pass the jason data into a javascript object
const dParse = JSON.parse(jData);

const overview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);

const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/overviewTemplate.html`,
  "utf-8"
);

console.log(slug("hassan rulz"), "");
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");

const web = ws.createServer(function (req, res) {
  // res.end("HELLO TO HASSANS WEB SERVER");
  //now lets do somethong called routing which is setting a response from each page
  //we can do this by setting from the url module

  const { query, pathname: pathName } = url.parse(req.url, true);

  const see = url.parse(req.url, true);
  console.log(see);

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    let ovchange = dParse
      .map(function (ele) {
        return changeOver(overviewTemplate, ele);
      })
      .join();

    const finChange = overview.replace("{%CARDS-CONTAINER%}", ovchange);
    res.end(finChange);
  } else if (pathName === "/product") {
    res.writeHead(200, { "contebt-type": "text/html" });
    let find = dParse.findIndex(function (ele) {
      return ele.productName === query.id;
    });
    console.log(query.id);
    console.log(find);
    outtie = changeOver(product, dParse[find]);
    res.end(outtie);
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(jData);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });

    res.end("<h1>PAGE NOT FOUND</h1>");
  }
});

web.listen(8000, "127.0.0.1", function () {
  console.log("LOADING!!!");
});

//now lets make an external module
//we do this by creating an external file with the javascript file in it by assigning module.export to it
