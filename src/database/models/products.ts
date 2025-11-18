import { Schema, model, Model } from "mongoose";

const productsSchema = new Schema({
    name:{
        type: String,
        required: [true, "El nombre es requerido"]
    },
    category: {
        type: String,
        required: [true, "La categoria es requerida"],
        unique: true,
        trim: true,
        lowecase: true,
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
    },
    image: {
        type: String,
        default: "/placeholder.jpg"
    },
    description: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    }
    
});

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Product: Model<any>;
try {
    // Intenta compilar el modelo solo una vez
    Product= model("products");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    // Si el modelo ya está compilado, úsalo
    Product = model("products", productsSchema);
}

export default Product;