 import React from "react";
import { Link } from "react-router-dom";

const SearchCard = ({ data }) => {
  const id = data?._id ?? data?.id; // hỗ trợ cả _id hoặc id
  return (
    <Link to={`/movie/${id}`} className="flex h-14 items-center gap-2 border-b border-gray-400 px-2 text-xs font-bold min-w-44">
      <img
        loading="lazy"
        src={data?.backdrop_path ? `https://media.themoviedb.org/t/p/w500_and_h282_face${data?.backdrop_path}` : 'https://placehold.co/500x282?text=...'}
        alt=""
        className="w-20 rounded-md"
      />
      <div>
        <h3 className="pb-1">{data?.title}</h3>
        <p className="font-light">{data?.release_date}</p>
      </div>
    </Link>
  );
};



export default SearchCard;


// import React from "react";
// import { Link } from "react-router-dom";

// const SearchCard = ({ data }) => {
//   return (
//     <Link
//       to={`/movie/${data?._id ?? data?.id}`}
//       className="flex h-14 items-center gap-2 border-b border-gray-400 px-2 text-xs font-bold min-w-44"
//     >
//       <img
//         loading="lazy"
//         // 🔹 Nếu backend của bạn đã trả về full URL ảnh, ví dụ: data.posterUrl
//         // thì chỉ cần gọi trực tiếp: src={data?.posterUrl || 'fallback'}
//         // 🔹 Nếu backend chỉ lưu path (VD: /uploads/abc.jpg), dùng biến môi trường
//         src={
//           data?.backdrop_path
//             ? `${import.meta.env.VITE_IMAGE_BASE_URL}${data.backdrop_path}`
//             : "https://placehold.co/500x282?text=..."
//         }
//         alt={data?.title}
//         className="w-20 rounded-md"
//       />
//       <div>
//         <h3 className="pb-1">{data?.title}</h3>
//         <p className="font-light">{data?.release_date}</p>
//       </div>
//     </Link>
//   );
// };

// export default SearchCard;
