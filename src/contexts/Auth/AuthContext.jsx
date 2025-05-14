import { createContext, useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@/api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isVerify, setIsVerify] = useState(true);

  const navigate = useNavigate();

  const verifyMe = async () => {
    setIsVerify(true);
    await instance
      .post("/me", null)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAuth(true);
          setUser(response?.data?.data);
        } else {
          setAuth(false);
        }
      })
      .catch(() => {
        setAuth(false);
      })
      .finally(() => {
        setIsVerify(false);
      });
  };

  useLayoutEffect(() => {
    verifyMe();
  }, []);

  // const isTokenExpired = (token) => {
  //   try {
  //     const decoded = jwtDecode(token);
  //     const now = Date.now() / 1000; // in seconds
  //     return decoded.exp && decoded.exp < now;
  //   } catch (_) {
  //     return true; // error berarti token invalid
  //   }
  // };

  console.log(user);

  // temp code
  const Logout = async () => {
    await instance
      .post(import.meta.env.VITE_LOGOUT, null, {
        withCredentials: true,
      })
      .then((res) => console.log(res));
    setAuth(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, setAuth, user, Logout, isVerify, setIsVerify, verifyMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
