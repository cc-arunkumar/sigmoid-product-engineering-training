const express = require("express"); //getting or importing the modeule express
const app = express(); //initialisation of the libraries,entire express library intialised and kept. in express variable instance ,its like object instance is intialised and wecall classs express methods,modules are classes
app.get("/", (req, res) => {
  //default api trying to hit,whenevre we hit website,port by defualt for node is 3000
  res.send("Welcome to Backend!!"); // default path at /,res.send is the response we are seding back from the server side this becomes part of response body
}); //only getting a dummy message
//req=http request object,res=http response object ,request object recieved only when we go ot the website of locahost:3000
//provided path of the request is / then request sent ,
//sending response body
//client software :browser default dns namme:localhsot:3000
//when we launch the serverthis console log happens
//server by default launched at 3000
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
