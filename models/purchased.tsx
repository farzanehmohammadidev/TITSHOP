import mongoose, { Schema, models, model } from "mongoose";

const purchasedSchema = new Schema(
  {
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    purchased: [
      {
        _id: String,
        name: String,
        image: String,
        price: String,
        desc: String,
        category: String,
        purchasedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { collection: "purchased", timestamps: true }
);

const Purchased = models.Purchased || model("Purchased", purchasedSchema);
export default Purchased;
