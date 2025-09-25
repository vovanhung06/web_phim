import axios from 'axios';
import Movie from '../models/Movie.js';

export const list = async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '20', 10);
  const skip = (page - 1) * limit;
  const q = req.query.q?.trim();
  const sort = req.query.sort || '-popularity'; 

  const filter = {};
  if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { name: new RegExp(q, 'i') }];

  const [total, results] = await Promise.all([
    Movie.countDocuments(filter),
    Movie.find(filter).sort(sort).skip(skip).limit(limit).lean()
  ]);

  res.json({ page, total, results });
};

export const getOne = async (req, res) => {
  const doc = await Movie.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

export const create = async (req, res) => {
  const body = { ...req.body };
  if (body.id && !body._id) body._id = body.id;   // cho phép gửi "id" như TMDb
  body.created_by_admin = true;
  const doc = await Movie.create(body);
  res.status(201).json(doc);
};

export const update = async (req, res) => {
  const doc = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

export const remove = async (req, res) => {
  const r = await Movie.findByIdAndDelete(req.params.id);
  if (!r) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
};

// Import 1 phim từ TMDb theo id
export const importFromTmdb = async (req, res) => {
  const id = req.params.tmdbId;
  const key = process.env.TMDB_API_KEY;
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: { api_key: key, language: 'vi-VN' }
    });
    // map _id = TMDb id
    const upsert = await Movie.findByIdAndUpdate(
      data.id,
      { ...data, _id: data.id, media_type: 'movie' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(upsert);
  } catch (e) {
    res.status(400).json({ message: 'TMDb fetch failed', error: e?.response?.data || e.message });
  }
};

