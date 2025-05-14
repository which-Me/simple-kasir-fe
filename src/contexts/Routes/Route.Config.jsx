import { NotFound } from "@/pages/components/404/404";
import { Account } from "@/pages/components/account/account";
import { Login } from "@/pages/components/auth/Login";
import { Order } from "@/pages/components/order/order";
import { Product } from "@/pages/components/product/product";
import { Report } from "@/pages/components/report/report";
import { Navigate } from "react-router-dom";

export const privateRouteConfig = {
  Superadmin: [
    { path: "/reports", element: <Report /> },
    { path: "/accounts", element: <Account /> },
    { path: "/orders", element: <Order /> },
    { path: "/products", element: <Product /> },
    { path: "*", element: <NotFound /> },
  ],
  Admin: [
    { path: "/orders", element: <Order /> },
    { path: "/products", element: <Product /> },
    { path: "*", element: <NotFound /> },
  ],
  User: [
    { path: "/orders", element: <Order /> },
    { path: "/products", element: <Product /> },
    { path: "*", element: <NotFound /> },
  ],
};

export const publicRouteConfig = () => {
  return [
    { path: "/login", element: <Login /> },
    { path: "/regist", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ];
};
