import express, { Request, Response } from 'express';

const app = express();
const port = 3333;
app.use(express.json())

const products = [
    {
        id: 1,
        name: "camisa",
        price: 150
    },
    {
        id: 2,
        name: "calça",
        price: 200
    },
]

app.get('/products', (request: Request, response: Response) => {
    response.status(202).json(products)
});

app.get('/products/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const product = products.find(p => p.id == Number(id));
    response.status(202).json(product)
});

app.post('/products', (request: Request, response: Response) => {
    const { name, price } = request.body;
    const lastItem = products[products.length - 1];

    const product = {
        id: (lastItem.id + 1),
        name: name,
        price: price,
    }
    products.push(product)
    response.status(201).json(product);
});

app.delete('/products/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const index = products.findIndex(p => p.id == Number(id));
    products.splice(index, 1);
    response.status(204).send("produto deletado")
});

app.put('/products/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const product = products.find(p => p.id == Number(id));
    const index = products.findIndex(p => p.id == Number(id));

    if (!product) {
        throw new Error('Error')
    }
    product.name = name;
    product.price = price;

    products[index] = product;

    response.status(202).json(product);


});



app.listen((port), () => {
    console.log("🐱‍👤 server is running");

});