import mongoose, { Schema, Document, model, models } from "mongoose";

interface IPhone {
  name: string;
  price: string;
  desc?: string;
  image?: string;
}

export interface IPhoneDoc extends Document, IPhone {}

const PhoneSchema = new Schema<IPhoneDoc>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: String,
    image: String,
  },
  { collection: "phone", timestamps: true }
);

const Phone = models.Phone || model<IPhoneDoc>("Phone", PhoneSchema);
export default Phone;
