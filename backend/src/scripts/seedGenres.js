import "dotenv/config";
import mongoose from "mongoose";
import axios from "axios";
import Genre from "../models/Genre.js";

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("✅ Connected to DB");

    const tmdbKey = process.env.TMDB_API_KEY;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbKey}&language=en-US`
    );

    await Genre.deleteMany(); // xóa cũ nếu có
    await Genre.insertMany(data.genres);

    console.log("✅ Seeded genres successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
