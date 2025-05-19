import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login";
import Register from "../components/register";
import Dashboard from "../components/admin/dashboard/dashboard";
import AuthGuard from "../components/guard/auth-guard";
import Product from "../components/admin/products/product";
import AddProduct from "../components/admin/products/add-product";
import EditProduct from "../components/admin/products/edit-product";
import Transaction from "../components/admin/transactions/transaction";
import Category from "../components/admin/categories/category";
import AddCategory from "../components/admin/categories/add-category";
import EditCategory from "../components/admin/categories/edit-category";
import TransactionDetail from "../components/admin/transactions/transaction-detail";
import AdminLayout from "../components/layout/admin-layout";
import UserLayout from "../components/layout/user-layout";

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
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/categories",
        element: <Category />,
      },
      {
        path: "/categories/add",
        element: <AddCategory />,
      },
      {
        path: "/categories/edit/:id",
        element: <EditCategory />,
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
      {
        path: "/transactions",
        element: <Transaction />,
      },
      {
        path: "/transactions/:id",
        element: <TransactionDetail />,
      },
    ],
  },
  {
    path: "/",
    element: <UserLayout />,
  },
]);
