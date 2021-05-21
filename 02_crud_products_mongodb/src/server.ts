import express, { Request, Response } from 'express';
import Mongoose from 'mongoose';
import { routes } from './routes'

const app = express();
const port = 3333;

Mongoose.connect('mongodb://localhost:27017/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json())
app.use(routes)




app.listen((port), () => {
    console.log("🐱‍👤 server is running");

});