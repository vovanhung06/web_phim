export const TRENDING_TYPES = [
    {
      id: "all",
      title: "All",
      APIurl: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    },
    {
      id: "tv",
      title: "TV Shows",
      APIurl: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    },
    {
      id: "movie",
      title: "Movies",
      APIurl: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    },
];

export const TOP_RATED_TYPES=[
    {
        id: 'movie',
        title: 'Movies',
        APIurl: 'https://api.themoviedb.org/3/movie/top_rated'
    },
    {
        id: 'tv',
        title: 'TV Shows',
        APIurl: 'https://api.themoviedb.org/3/tv/top_rated'
    }
]

