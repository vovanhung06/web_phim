import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Movie from "./Movie";
import useFetch from "../../hooks/useFetch";

const Index = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [isLoading, data] = useFetch({
    url: `${API_BASE}/movies/popular?page=1`,
  });

  const movies = (data?.results || []).slice(0, 4);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={movies.length > 1}
        className="w-full h-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id || movie.id}>
            <Movie data={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Index;
