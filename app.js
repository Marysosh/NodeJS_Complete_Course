const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    // quits the server
    // process.exit();

    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Test Page</title></head>");
    res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
    res.write("</html>");

    //we mustn't change the response after res.end();
    res.end(); 
});

server.listen(3000);