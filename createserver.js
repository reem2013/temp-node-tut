const http = require('http');


const server = http.createServer((req, res) => {
    const pathName = req.url;
    
    if (pathName === '/') {
        res.end('This is the Homepage!')
        return;
    }
    else if (pathName === '/about'){
        res.end('Here is our short History')
        return;
    }
    else {
        res.end(`
        <h1>page not found</h1>
        <p>we can't found page you are looking for</p>
        <a href="/">back home</a>`)
    }
})

server.listen(8000, '127.0.0.1');