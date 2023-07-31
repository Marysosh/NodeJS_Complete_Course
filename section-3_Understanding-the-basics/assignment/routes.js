const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');

        res.write('<html>');
        res.write('<head><title>Main page</title></head>');
        res.write('<body><h1>Hello, User!</h1><form action="/create-user" method="POST"><label>Username:</label><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
    
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');

        res.write('<html>');
        res.write('<head><title>List of users</title></head>');
        res.write('<body><h1>List of users:</h1><ul><li>James</li><li>Lily</li><li>Pam</li></ul></body>');
        res.write('</html>');

        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const requestBody = [];

        req.on('data', (chunk) => {
            requestBody.push(chunk);
        });
        
        req.on('end', () => {
        const parsedBody = Buffer.concat(requestBody).toString();
        const username = parsedBody.split('=')[1];

        console.log(username);

        res.statusCode = 302;
        res.setHeader('Location', '/');

        return res.end();
        })
    }

};

exports.handler = requestHandler;