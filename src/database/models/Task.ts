import { Schema, model, Model } from "mongoose";

const taskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
    },
    limitDate: {
        type: String,
        required: true,
    }
    
    
}); 

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Task: Model<any>;
try {
    // Intenta compilar el modelo solo una vez
    Task= model("task");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    // Si el modelo ya está compilado, úsalo
    Task = model("task", taskSchema);
}

export default Task;