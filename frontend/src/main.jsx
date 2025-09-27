import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import ModalProvider from "./context/ModalProvider.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { Toaster } from "react-hot-toast";
import { FavoriteProvider } from "./context/FavoriteContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ActorPage = lazy(() => import("./pages/ActorPage.jsx"));
const MediaPage = lazy(() => import("./pages/MediaPage.jsx"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/:type/:id", element: <MediaPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/account", element: <AccountPage /> },
      { path: "/admin", element: <AdminPage /> },
      {
        path: "/actor/:id",
        element: <ActorPage />,
        loader: async ({ params }) => {
          const res = await fetch(`${API_BASE}/actors/${params.id}`);
          if (!res.ok)
            throw new Response(await res.text(), { status: res.status });
          return res.json();
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <FavoriteProvider>
          <RouterProvider router={router} />
          <Toaster />
        </FavoriteProvider>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>
);
