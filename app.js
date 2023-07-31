const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === "/") {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');

        //return is added to quit all big createServer callback function execution
        return res.end();
    }


    // quits the server
    // process.exit();

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Test Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');

    //we mustn't change the response after res.end();
    res.end(); 
});

server.listen(3000);