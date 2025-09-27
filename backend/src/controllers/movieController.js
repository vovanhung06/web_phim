import axios from 'axios';
import Movie from '../models/Movie.js';


/**
 * Lấy danh sách phim với phân trang, tìm kiếm, sắp xếp
 * ?page=&limit=&q=&sort=
 */
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

/** Lấy thông tin 1 phim theo id */
export const getOne = async (req, res) => {
  const doc = await Movie.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

/** Tạo phim mới (admin) */
export const create = async (req, res) => {
  const body = { ...req.body };
  if (body.id && !body._id) body._id = body.id; // cho phép gửi "id" như TMDb
  body.created_by_admin = true;
  const doc = await Movie.create(body);
  res.status(201).json(doc);
};

/** Cập nhật phim (admin) */
export const update = async (req, res) => {
  const doc = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

/** Xoá phim (admin) */
export const remove = async (req, res) => {
  const r = await Movie.findByIdAndDelete(req.params.id);
  if (!r) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
};

/**
 * Import 1 phim từ TMDb theo id (admin)
 * Lưu _id = id của TMDb để đồng nhất
 */
export const importFromTmdb = async (req, res) => {
  const id = req.params.tmdbId;
  const key = process.env.TMDB_API_KEY;
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: { api_key: key, language: 'vi-VN' }
    });
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

/** Lấy phim gợi ý/ liên quan */
export const getRecommendations = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query; // movie hoặc tv
  const rec = await Movie.find({ relatedTo: id, type }); // tuỳ logic của bạn
  res.json({ results: rec });
};

/** ===== Các endpoint BỔ SUNG ===== */

/** Phim phổ biến (sort theo popularity) */
export const popular = async (req, res) => {
  const limit = parseInt(req.query.limit || '20', 10);
  const results = await Movie.find().sort('-popularity').limit(limit).lean();
  res.json({ results });
};

/**
 * Proxy lấy videos (trailer) từ TMDb theo id
 * Nếu đã lưu sẵn vào DB có thể thay bằng dữ liệu local
 */
export const videos = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid movie id' });
    }

    const movie = await Movie.findById(id).lean();
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    // Trả về trailer đã seed
    res.json({ id: movie._id, results: movie.videos || [] });
  } catch (e) {
    res.status(400).json({ message: 'Cannot fetch videos', error: e.message });
  }
};



/** Lọc phim theo rating & genre */
export const discover = async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '20', 10);
  const skip = (page - 1) * limit;

  const min = parseFloat(req.query.minRating || '0');
  const max = parseFloat(req.query.maxRating || '10');

  const filter = {
    vote_average: { $gte: min, $lte: max }
  };

  if (req.query.genre) {
    // genre có thể là "28,12", tách và ép kiểu
    const genreIds = req.query.genre.split(',').map(g => Number(g));
    filter['genres.id'] = { $in: genreIds };
  }

  const [total, results] = await Promise.all([
    Movie.countDocuments(filter),
    Movie.find(filter).sort('-popularity').skip(skip).limit(limit).lean()
  ]);

  res.json({ page, total, results });
};



export const search = async (req, res) => {
  const q = req.query.q?.trim();
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '20', 10);
  const skip = (page - 1) * limit;

  if (!q) {
    return res.status(400).json({ message: 'Query (q) is required' });
  }

  const filter = {
    $or: [
      { title: new RegExp(q, 'i') },
      { name: new RegExp(q, 'i') }
    ]
  };

  const [total, results] = await Promise.all([
    Movie.countDocuments(filter),
    Movie.find(filter).skip(skip).limit(limit).lean()
  ]);

  res.json({ page, total, results });
};



