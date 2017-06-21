console.log("Server starting");

import Http = require("http");
import Url = require("url");

interface AssocStringString {
    [key: string]: string;
}

let port: number = process.env.PORT;
if (port == undefined)
    port = 8100;

let server: Http.Server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);

function handleListen(): void {
    console.log("Listening on port: " + port);
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Request received");
    console.log(_request.url);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    let query: AssocStringString = Url.parse(_request.url, true).query;
    console.log(query);
    _response.write("Hallo " + query["Vorname"] + ", <br> du erhaeltst von uns folgende Eissorten <br>");
    let key: string;
    for (key in query) {
        if (key != "Toppings" && key != "Vorname" && key != "Name" && key != "address" && key != "email" && key != "Behaelter") {
            _response.write(key + "<br>");
        }
    }

    _response.write("Dein Eis ist dann in einem " + query["Behaelter"] + "  mit dem Topping " + query["toppings"] + "<br>");
    _response.write("Die Bestellung wird an " + query["address"] + " gesendet <br>");
    _response.write("Bestätigung der Bestellung wird gesendet zu " + query["mail"]);


    _response.end();
}