import { Schema, model, models } from "mongoose";

const usersSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  email: {
    type: String,
    required: [true, "El email es requerido"],
    unique: true,
    trim: true,
    lowercase: true, // corregido
  },
  pass: {
    type: String,
    required: [true, "La contraseña es requerida"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

// ESTA ES LA LINEA CORRECTA
const User = models.User || model("User", usersSchema);

export default User;
