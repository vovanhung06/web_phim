import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link,useNavigate  } from "react-router-dom";
import SearchCard from "./SearchCard";
import useFetch from "../hooks/useFetch";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

const [searchLoading, searchData] = useFetch({
  url: `${API_BASE}/search/movie?query=${encodeURIComponent(searchValue)}&page=1`,
});

  // trạng thái login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check khi load trang
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // lắng nghe sự kiện thay đổi token
    const syncLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncLogin);
    return () => window.removeEventListener("storage", syncLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <header className="fixed top-0 z-10 flex h-14 w-screen items-center bg-black px-10 text-xs font-light text-white sm:text-base">
        {/* Logo + menu trái */}
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <img src="/header-logo.png" alt="" className="w-16 sm:w-28" />
          </Link>
          <Link to={"/search?media_type=movie"}>Loc Phim</Link>
          <Link to={"/search?media_type=tv"}>Chanels</Link>
        </div>

        {/* Search + login phải */}
        <div className="flex items-center gap-4 ml-auto">
          <div
            className="relative text-black min-w-44"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setSearchValue("");
            }}
          >
            <input
              type="text"
              placeholder="Search"
              className="w-[17vw] rounded-md px-2 py-1 font-normal outline-none"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500"
            />
            {searchValue && (
              <div
                className="absolute bg-white w-full rounded-b-lg max-h-[65vh] overflow-auto"
                onClick={() => setSearchValue("")}
              >
                {(searchData?.results || []).map((card) => (
                  <SearchCard key={card.id} data={card} />
                ))}
              </div>
            )}
          </div>

          {/* Đổi nút login/logout */}
          {isLoggedIn ? (
  <div className="flex items-center gap-3">
    {/* ✅ Nút Quản lý tài khoản */}
    <Link to="/account">
      <button className="py-2 px-5 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold transition duration-200">
        Quản lý tài khoản
      </button>
    </Link>

    {/* Nút Logout */}
    <button
      onClick={handleLogout}
      className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition duration-200"
    >
      Logout
    </button>
  </div>
) : (
  <Link to="/login">
    <button className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition duration-200">
      Sign In
    </button>
  </Link>
)}

        </div>
      </header>

      <div className="h-14"></div>
    </div>
  );
};

export default Header;
