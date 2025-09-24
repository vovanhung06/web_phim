import { useState } from "react";

export default function SidebarAdmin({ setTab }) {
  const menuItems = [
    { key: "users", label: "Quản lý tài khoản thành viên" },
    { key: "movies", label: "Quản lý phim" },
    { key: "categories", label: "Quản lý danh mục" },
    { key: "comments", label: "Quản lý bình luận người dùng" },
  ];

  const [active, setActive] = useState("users");

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold py-6 text-center border-b border-gray-700">
        Quản lý hệ thống
      </h2>
      <ul className="flex-1 flex flex-col items-center gap-4 text-lg mt-4">
        {menuItems.map((item) => (
          <li key={item.key} className="w-full px-4">
            <button
              onClick={() => {
                setTab(item.key);
                setActive(item.key);
              }}
              className={`w-full py-2 rounded-lg transition-colors duration-200 ${
                active === item.key
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
