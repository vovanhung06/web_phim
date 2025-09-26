import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // id giống TMDB
  name: { type: String, required: true }
});

export default mongoose.model("Genre", GenreSchema);
