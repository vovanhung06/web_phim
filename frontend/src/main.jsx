import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomePage from "./pages/HomePage.jsx";
import RootLayout from "./pages/RootLayout.jsx";
// import MediaPage from "./pages/MediaPage.jsx";
// import ActorPage from "./pages/ActorPage.jsx";
import ModalProvider from "./context/ModalProvider.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import AccountPage from "./pages/AccountPage.jsx";



const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ActorPage = lazy(() => import("./pages/ActorPage.jsx"));
const MediaPage = lazy(() => import("./pages/MediaPage.jsx"));
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:type/:id",
        element: <MediaPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/register", 
        element: <Register /> 
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/actor/:id",
        element: <ActorPage />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/person/${params.id}`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjAwYjI2YjI5NmVkYWRjZDNiMDBkMGZmMDk4N2NhMSIsIm5iZiI6MTczMzY2MTAwNy4yMDcsInN1YiI6IjY3NTU5MTRmYTE4Y2I4Njk1YWZkNjhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yp1Xsm8VtauuJiXpH6hGZ79EMn5QaKXSkReRDUOC6gk",
              },
            },
          );
          return res.json();
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </StrictMode>,
);
