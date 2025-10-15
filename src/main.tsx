import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import User from "./modules/ConfirmCheckin.tsx";
import Layout from "./layouts/layout.tsx";
import Event from "./modules/Event/event.tsx";
import Calendar from "./modules/Event/calendar.tsx";
import CheckList from "./modules/Event/CheckList.tsx";
import SeatMap from "./modules/Event/SeatMap.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/users/:id",
        loader: ({ params }) => ({ id: params.id }),
        element: <User />,
      },
      {
        path: "/events",
        element: <Event />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/seatmap",
        element: <SeatMap csvUrl="./event-1610-data-images.csv" />,
      },
      {
        path: "/check-list",
        element: <CheckList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
