import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // tên của collection muốn đếm (vd: "movies")
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model("Counter", counterSchema);
export default Counter;
