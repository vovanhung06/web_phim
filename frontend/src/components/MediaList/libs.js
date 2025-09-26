// export const TRENDING_TYPES = [
//     {
//       id: "all",
//       title: "All",
//       APIurl: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
//     },
//     {
//       id: "tv",
//       title: "TV Shows",
//       APIurl: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
//     },
//     {
//       id: "movie",
//       title: "Movies",
//       APIurl: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
//     },
// ];

// export const TOP_RATED_TYPES=[
//     {
//         id: 'movie',
//         title: 'Movies',
//         APIurl: 'https://api.themoviedb.org/3/movie/top_rated'
//     },
//     {
//         id: 'tv',
//         title: 'TV Shows',
//         APIurl: 'https://api.themoviedb.org/3/tv/top_rated'
//     }
// ]

export const TRENDING_TYPES = [
  { id: "all", title: "All", APIurl: "/movies?sort=popularity.desc&limit=12" }
];

export const TOP_RATED_TYPES = [
  { id: "all", title: "All", APIurl: "/movies?sort=vote_average.desc&limit=12" }
];
// Lưu ý: Các URL API đã được thay đổi để gọi qua backend