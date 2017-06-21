"use strict";
console.log("Server starting");
var Http = require("http");
var Url = require("url");
var port = process.env.PORT;
if (port == undefined)
    port = 8100;
var server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    console.log(_request.url);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    var query = Url.parse(_request.url, true).query;
    console.log(query);
    _response.write("Hallo " + query["Vorname"] + ", <br> du erhaeltst von uns folgende Eissorten <br>");
    var key;
    for (key in query) {
        if (key != "Toppings" && key != "Vorname" && key != "Name" && key != "address" && key != "email" && key != "Behaelter") {
            _response.write(key + "<br>");
        }
    }
    _response.write("Dein Eis ist dann in einem " + query["Behaelter"] + "  mit dem Topping " + query["toppings"] + "<br>");
    _response.write("Die Bestellung wird an " + query["address"] + " gesendet <br>");
    _response.write("Best�tigung der Bestellung wird gesendet zu " + query["mail"]);
    _response.end();
}
//# sourceMappingURL=SendData.js.map