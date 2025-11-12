import mongoose, { Schema, Document, model, models } from "mongoose";

interface ILaptop {
  name: string;
  price: string;
  desc?: string;
  image?: string;
}

export interface ILaptopDoc extends Document, ILaptop {}

const LaptopSchema = new Schema<ILaptopDoc>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: String,
    image: String,
  },
  { collection: "laptop", timestamps: true }
);

const Laptop = models.Laptop || model<ILaptopDoc>("Laptop", LaptopSchema);
export default Laptop;
