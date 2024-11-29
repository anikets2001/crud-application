import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ViewComment from "../Pages/ViewComment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/ViewComment/:id",
    element: <ViewComment />,
  },
]);
