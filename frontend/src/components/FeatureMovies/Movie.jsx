import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { useModalContext } from "../../context/ModalProvider";
import { Link } from "react-router-dom";

const Movie = ({ data: movie }) => {
  if (!movie) return null;

  const { backdrop_path, title, release_date, overview, _id } = movie;
  const { setIsShowing, setContent } = useModalContext();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // gọi API lấy video trailer theo _id
  const [isLoading, videoData] = useFetch(
    _id ? { url: `${API_BASE}/movies/${_id}/videos` } : {},
    Boolean(_id)
  );

  const youtubeKey = (videoData?.results || []).find(
    (video) => video.type === "Trailer"
  )?.key;

  return (
    <div className="relative w-full h-[85vh]">
      {/* Ảnh nền */}
      {backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={title}
          className="w-full h-full object-cover brightness-50"
        />
      )}

      {/* Overlay nội dung */}
      <div className="absolute bottom-[20%] left-[8%] w-[50%] text-white">
        <h2 className="mb-3 text-4xl sm:text-5xl font-bold">{title}</h2>

        {/* Ngày phát hành */}
        <div className="flex gap-2 items-center mb-3">
          <p className="border border-gray-400 px-2 font-bold text-gray-400">
            PG13
          </p>
          <p className="font-light">{release_date}</p>
        </div>

        {/* Overview */}
        <div className="hidden sm:block mb-4">
          <h3 className="text-2xl font-bold">Overview</h3>
          <p className="font-extralight">{overview}</p>
        </div>

        {/* Nút Play + Chi tiết */}
        <div>
          <button
            onClick={() => {
              if (!youtubeKey) return;
              setIsShowing(true);
              setContent(youtubeKey);
            }}
            className="mr-2 mt-3 rounded-full bg-[#E50914] px-5 py-2 hover:bg-red-700 transition"
          >
            <FontAwesomeIcon className="mr-2" icon={faPlay} />
            Play
          </button>
          <Link
            to={`/movies/${_id}`}
            className="inline-block mt-3 px-5 py-2 rounded-full bg-gray-600 hover:bg-gray-700 transition"
          >
            Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Movie;
