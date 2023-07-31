const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');

        //return is added to quit all big createServer callback function execution
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const requestBody = [];

        //on method allows us to listen events
        //data event will be fired whenever a new chunk is ready to be read
        req.on('data', (chunk) => {
            console.log(chunk);
            requestBody.push(chunk);
        });

        //end event will be fired once it's done parsing to request data
        return req.on('end', () => {
            //to interact with received chunks we need to buffer them
            //this will create a new buffer and add all chunks from body to it
            const parsedBody = Buffer.concat(requestBody).toString();
            const message = parsedBody.split('=')[1];

            //writing message to file
            //Sync is for Synchronous, will block code execution until the file is created
            //Better to use writeFile instead of writeFileSync
            fs.writeFile('message.txt', message, (err) => {
                //here we can handle the error
                
                //302 code is responsible for redirection
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
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