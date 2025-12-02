import { Schema, model, models } from "mongoose";

const productsSchema = new Schema({
    name:{
        type: String,
        required: [true, "El nombre es requerido"]
    },
    category: {
        type: String,
        required: [true, "La categoria es requerida"],
        trim: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
    },
    image: {
        type: String,
        default: "/placeholder.jpg"
    },
    stock: {
        type: Number,
    }
    ,
    description: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    createdAt: {
        type: String,
    }
    
}); 

const Product = models["products"] || model("products", productsSchema);

export default Product;