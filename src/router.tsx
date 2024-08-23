import { createBrowserRouter } from "react-router-dom";
import Home from './pages/home';
import EmployeeList from "./pages/employee-list";
import ErrorPage from "./pages/error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/employee-list",
    element: <EmployeeList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/erreur404",
    element: <ErrorPage />,
  },
]);
