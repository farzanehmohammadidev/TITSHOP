import mongoose, { Schema, Document, model, models } from "mongoose";

interface IConsole {
  name: string;
  price: string;
  desc?: string;
  image?: string;
}

export interface IConsoleDoc extends Document, IConsole {}

const ConsoleSchema = new Schema<IConsoleDoc>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: String,
    image: String,
  },
  { collection: "console", timestamps: true }
);

const Console = models.Console || model<IConsoleDoc>("Console", ConsoleSchema);
export default Console;
