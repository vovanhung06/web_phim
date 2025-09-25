import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import express from 'express';

import mongoose from 'mongoose';
import Movie from '../models/Movie.js';

// hàm sleep để chờ giữa các request, tránh quá tải TMDb

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log('Mongo connected');

  const key = process.env.TMDB_API_KEY;

  // ví dụ: import top 50 popular
  const ids = [];
  for (let page = 1; page <= 3; page++) {
    const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: { api_key: key, sort_by: 'popularity.desc', page, language: 'vi-VN' }
    });
    data.results.forEach(m => ids.push(m.id));
    await sleep(300);
  }

  // fetch chi tiết từng id và upsert
  for (const id of ids) {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: { api_key: key, language: 'vi-VN' }
    });
    await Movie.findByIdAndUpdate(
      data.id,
      { ...data, _id: data.id, media_type: 'movie' },
      { upsert: true, setDefaultsOnInsert: true }
    );
    console.log('Imported', data.title);
    await sleep(150);
  }

  console.log('✅ Seed done');
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
