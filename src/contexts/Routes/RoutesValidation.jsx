import { Route, Routes } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { LayoutProvider } from "@/pages/Layout/Layout";
import { publicRouteConfig, privateRouteConfig } from "./Route.Config";

export const RoutesProtect = () => {
  const { isAuth, isVerify, user } = useAuth();

  if (isVerify) {
    return;
  }

  const role = user && user.role;
  const privateRoutes = role && privateRouteConfig[role];
  const publicRoutes = publicRouteConfig();

  return isAuth ? (
    <LayoutProvider>
      <Routes>
        {privateRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </LayoutProvider>
  ) : (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
