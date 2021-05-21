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