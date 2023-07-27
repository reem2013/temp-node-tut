const http = require('http');
const fs = require('fs');
const url = require('url');


// filling template
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{$PRODUCTNAME}/g, product.productName); // g --> to repace all PRODUCTNAME
    output = output.replace(/{$ID}/g, product.id);
    output = output.replace(/{$IMAGE}/g, product.image);
    output = output.replace(/{$FROM}/g, product.from);
    output = output.replace(/{$NUTRIENTS}/g, product.nutrients);
    output = output.replace(/{$QUANTITY}/g, product.quantity);
    output = output.replace(/{$PRICE}/g, product.price);
    output = output.replace(/{$DESCRIPTION}/g, product.description);

    if(!product.organic){
        output = output.replace(/{$NOT_ORGANIC}/g, 'not-organic');
        return output;
    }
}
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

// Read Data Synch
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

// Simple Routing
const server = http.createServer((req, res) => {
    const pathName = req.url;

// overview page
    if (pathName === '/' || pathName === '/overview' ){
        res.writeHead(200, {'content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')   // for 5 products
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    }
    else if (pathName === '/product'){
        res.end('hello from product');
    }
    // API
    else if (pathName === '/api'){
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>page not found!</h1>');

    }
});
server.listen(8000, '127.0.0.1' , () => {
    console.log('listening from srever')
})

// 