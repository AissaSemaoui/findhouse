import { useSession } from "next-auth/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated, setUser } from "../features/auth/authSlice";

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const { data, status } = useSession();
  const user = data?.user || null;

  useEffect(() => {
    if (status === "loading") {
      dispatch(setAuthenticated(null));
    } else if (status === "authenticated") {
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  }, [status]);

  return <>{children}</>;
}

export default AuthProvider;
