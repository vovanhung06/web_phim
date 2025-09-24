import { useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import ManageUsers from "./ManageUsers";
import ManageMovies from "./ManageMovies";
import ManageCategories from "./ManageCategories";
import ManageComments from "./ManageComments";

export default function AdminLayout() {
  const [tab, setTab] = useState("users");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdmin setTab={setTab} />

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-white shadow-md overflow-y-auto">
        {tab === "users" && <ManageUsers setTab={setTab} />}
        {tab === "movies" && <ManageMovies setTab={setTab} />}
        {tab === "categories" && <ManageCategories setTab={setTab} />}
        {tab === "comments" && <ManageComments setTab={setTab} />}
      </div>
    </div>
  );
}
