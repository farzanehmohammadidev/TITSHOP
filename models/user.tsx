import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      trim: true,
    },
    password: { type: String, required: true, minLength: 3, maxLength: 100 },
    email: { type: String, required: true, trim: true, unique: true },
    role:{ type: String, default: "user" },
  },
  { collection: "user", timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
