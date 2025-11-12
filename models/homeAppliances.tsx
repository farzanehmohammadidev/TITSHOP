import mongoose, { Schema, Document, model, models } from "mongoose";

interface IHomeAppliances {
  name: string;
  price: string;
  desc?: string;
  image?: string;
}

export interface IHomeAppliancesDoc extends Document, IHomeAppliances {}

const HomeApplianceschema = new Schema<IHomeAppliancesDoc>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: String,
    image: String,
  },
  { collection: "homeAppliances", timestamps: true }
);

const HomeAppliances = models.HomeAppliances || model<IHomeAppliancesDoc>("HomeAppliances", HomeApplianceschema);
export default HomeAppliances;
