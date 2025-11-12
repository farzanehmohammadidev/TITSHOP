import mongoose, { Schema, models, model } from "mongoose";

const cartSchema = new Schema(
  {
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    cart: [
      {
        _id: String,
        name: String,
        image: String,
        price: String,
        desc: String,
        category: String,
      },
    ],
  },
  { collection: "cart", timestamps: true }
);

const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;
