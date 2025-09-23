import { useState } from "react";
export default function Sidebar({ setTab }) {
  const menuItems = [
    { key: "info", label: "Tài khoản" },
    { key: "favorites", label: "Yêu thích" },
    { key: "list", label: "Danh sách" },
    { key: "history", label: "Lịch sử" },
    { key: "notifications", label: "Thông báo" },
  ];

  const [active, setActive] = useState("info"); 

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold py-6 text-center border-b border-gray-700">
        Quản lý tài khoản
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
                active === item.key ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
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
