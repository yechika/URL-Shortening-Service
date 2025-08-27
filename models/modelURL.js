import mongoose, { mongo } from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("URL", urlSchema);
