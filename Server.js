const fs = require("fs");
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

let array = ["hi"];


const server = http.createServer();

server.on("request", request_Handler);
server.on("listening", listen_Handler);


function request_Handler(request, response){
    const url = request.url;
    console.log(`Requesting for: ` + url);
    if(url === "/"){
        const html = fs.createReadStream("index.html");
        html.append("hi");
        response.writeHead(200, {"Content-Type": "text/html"});
        html.pipe(response);
    }else if(url === "/favicon.ico"){
        const html = fs.createReadStream("./favicon.ico");
        response.writeHead(200, {"Content-Type": "text/css"});
        html.pipe(response);
    }else if(url === "/resources/style/style.css"){
        const html = fs.createReadStream("resources/style/style.css");
        response.writeHead(200, {"Content-Type": "text/css"});
        html.pipe(response);
    }else if(url === "/resources/script/index.js"){
        const html = fs.createReadStream("resources/style/style.css");
        response.writeHead(200, {"Content-Type": "application/javascript"});
        html.pipe(response);
    }else{

        array.push(url);
        console.log("page not found");
        console.log(array);
    }
}


function listen_Handler(){
    console.log(`Listening on port ${port}`)
}

server.listen(port, hostname, ()=>{
    console.log(`Server is now running on http://${hostname}:${port}`);
});
