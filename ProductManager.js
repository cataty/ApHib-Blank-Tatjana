const fs = require('fs/promises'); // Importar el módulo fs/promises para trabajar con promesas

class ProductManager{    
    path = './productos.json';
    productos = [];

    constructor(){
        this.getProducts();
    }	

    async addProductAsync(title, description, price, stock){ // async/await
        await this.getProducts(); // Esperar a que se lean los productos del archivo
        if (!title || !description || !price || !stock) {
            console.log("Faltan datos obligatorios");
            return;
        } else {
            const producto = {
                id: this.randomID(), // Generar un id aleatorio, que no se repite
                title: title,
                description: description,
                price: price,
                stock: stock
            }
            this.productos.push(producto);
            this.saveProducts(); // Guardar el producto en el archivo productos.json
        }
    }

    addProduct(title, description, price, stock){ //version vieja con promesas
        if (!title || !description || !price || !stock) {
            console.log("Faltan datos obligatorios");
            return;
        } else {
            const producto = {
                id: this.productos.length + 1,
                title: title,
                description: description,
                price: price,
                stock: stock
            }
            if (this.productos.find(producto => producto.id == producto.id)){
                console.log("El id ya existe");
                producto.id = this.randomID()
                const id = this.productos.slice(-1)[0].id + 1; // Obtener el último id y sumarle 1
                producto['id'] = id; // Asignar el nuevo id al producto
            }
            this.productos.push(producto);
            this.saveProducts(); // Guardar el producto en el archivo productos.json
        }
    }

    randomID(){
        return crypto.randomUUID(); // Generar un id aleatorio
    };

    getProducts (){ //version vieja con promesas
        fs.readFile(this.path, 'utf8').then((data) => {
                this.productos = JSON.parse(data); // Convertir el string a objeto
                console.log("Productos leídos correctamente del archivo productos.json");
        }).catch((error) => {
                console.log('ocurrió un error: ' + error);
        });
        return this.productos; // Retornar el array de productos
    };

    async getProductsAsync(){ // async/await
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.productos = JSON.parse(data); // Convertir el string a objeto
            console.log("Productos leídos correctamente del archivo productos.json");
        } catch (error) {
            console.log('ocurrió un error: ' + error);
        }
    }

    async getProductById (id){
        await this.getProducts(); // Esperar a que se lean los productos del archivo
        if (this.productos.find(producto => producto.id == id)){
            return this.productos.find(producto => producto.id == id);
        } else {
            console.log("Not found");
        }
    };


    saveProducts (){
        fs.writeFile(this.path, JSON.stringify(this.productos, null, 2), 'utf8', (error) => {
            if(error) {
                console.log('ocurrió un error: ' + error);
            } else {
                console.log("Productos guardados correctamente en el archivo productos.json");
            }
        });
    };
}

module.exports = ProductManager;
// export default {ProductManager} // Exportamos la clase ProductManager