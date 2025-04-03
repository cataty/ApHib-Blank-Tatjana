const http = require('http');
const ProductManager = require('./ProductManager.js');


const productManage = new ProductManager(); // Crear una instancia de la clase ProductManager
const port = 3000;

const server = http.createServer( (req, resp) => { //request, response
    const url = req.url; //url del request
    const method = req.method; //metodo del request: Post, Get, Put, Delete

    let status = 200; //status code
    let contentType = 'text/plain'; //content type
    let body = '<h1>Hola Mundo</h1>'; //body

    console.log(`Request: ${method} ${url}`); // Mostrar el tipo de request y la ruta en consola
    if(url == '/'){ //router
        status = 200;
        contentType = 'text/html';
    } else if(url.includes('/products')){
        status = 200;
        if(url.split('products/')[1]){ // Si la url contiene /products/id
            const id = url.split('products/')[1]; // Obtener el id del producto de la url
            const product = productManage.getProductById(id);
            contentType = 'application/json';
            if(product){
                body = JSON.stringify(product);
            } else {
                status = 404;
                body = '<h1>Producto no encontrado</h1>';
            }
        } else {
            contentType = 'application/json';
            body = '<h1>Lista de productos</h1>';
            body += JSON.stringify(productManage.getProductsAsync()); // Mostrar la lista de productos en formato JSON  
         }
    } else {
        status = 404;
        body = '<h1>404 Not Found</h1>';
        contentType = 'text/html';
    }

    resp.writeHead(status, { 'content-type': contentType });
    resp.end(body);



}

);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

