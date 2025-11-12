import mongoose, { Schema, Document, model, models } from "mongoose";

interface INetworkEquipment {
  name: string;
  price: string;
  desc?: string;
  image?: string;
}
export interface InetworkEquipment extends Document, INetworkEquipment {}

const networkEquipmentSchema = new Schema<InetworkEquipment>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: String,
    image: String,
  },
  { collection: "networkEquipment", timestamps: true }
);

const NetworkEquipment = models.NetworkEquipment || model<InetworkEquipment>("NetworkEquipment", networkEquipmentSchema);
export default NetworkEquipment;
