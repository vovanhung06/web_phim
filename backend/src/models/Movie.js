import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },     // TMDb id
    imdb_id: String,
    media_type: { type: String, enum: ['movie', 'tv'], default: 'movie' },

    title: String,
    name: String,
    original_title: String,
    original_name: String,
    overview: String,

    release_date: String,
    first_air_date: String,

    runtime: Number,
    episode_run_time: [Number],

    genres: [{ id: Number, name: String }],

    poster_path: String,
    backdrop_path: String,

    popularity: Number,
    vote_average: Number,
    vote_count: Number,

    belongs_to_collection: mongoose.Schema.Types.Mixed,
    production_companies: [
      { id: Number, name: String, logo_path: String, origin_country: String }
    ],
    production_countries: [{ iso_3166_1: String, name: String }],
    spoken_languages: [{ iso_639_1: String, english_name: String, name: String }],

    status: String,
    homepage: String,
    revenue: Number,
    budget: Number,

    // Phục vụ quản trị
    created_by_admin: { type: Boolean, default: false },
    is_featured: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true, versionKey: false }
);

// expose "id" như TMDb
movieSchema.virtual('id').get(function () { return this._id; });
movieSchema.set('toJSON', { virtuals: true });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
