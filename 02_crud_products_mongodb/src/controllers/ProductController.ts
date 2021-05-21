import { Request, Response } from "express";
import Product from "../models/Product";

export async function create(request: Request, response: Response) {
    const { name, price } = request.body;
    const product = await Product.create({
        name,
        price
    })

    response.status(201).json(product);
};

export async function findAll(request: Request, response: Response) {
    const products = await Product.find();
    response.status(200).json(products);
};

export async function findOne(request: Request, response: Response) {
    const { name } = request.params;

    const product = await Product.findOne({ name: name });

    response.status(200).json(product);
};

export async function deleteForName(request: Request, response: Response) {
    const { name } = request.params;

    const product = await Product.findOne({ name: name });
    if (!product) {
        throw new Error('Oooops!');
    }
    await Product.findByIdAndDelete(product.id)
    response.status(204).json({ message: "Item deletado" });
};

export async function update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, price } = request.body;
    const product: any = await Product.findOne({ _id: id });

    product.name = name;
    product.price = price;

    await Product.updateOne({ _id: product.id }, product);

    response.status(200).json(product);
}