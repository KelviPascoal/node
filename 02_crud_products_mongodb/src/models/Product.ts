import Mongoose from 'mongoose';

const ProductSchema = new Mongoose.Schema({
    name: String,
    price: Number,
})

export default Mongoose.model('Product', ProductSchema, 'product');