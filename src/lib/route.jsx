import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login";
import Register from "../components/register";
import Dashboard from "../components/dashboard/dashboard";
import AuthGuard from "../components/guard/auth-guard";
import RootLayout from "../components/dashboard/layout";
import Product from "../components/products/product";
import AddProduct from "../components/products/add-product";
import EditProduct from "../components/products/edit-product";

export const routes = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/products/add",
        element: <AddProduct />,
      },
      {
        path: "/products/edit/:id",
        element: <EditProduct />,
      },
    ],
  },
]);
