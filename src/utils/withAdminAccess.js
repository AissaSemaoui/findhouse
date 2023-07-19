import { useSelector } from "react-redux";

import NotFound from "../components/404";

export const withAdminAccess = async (WrappedComponent) => {
  const WithAdminAccess = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    console.log("isAuthenticated : ", isAuthenticated);

    // useEffect(() => {
    //   if (isAuthenticated === false) {
    //     router.replace("/");
    //   }
    // }, [isAuthenticated, router]);

    if (isAuthenticated === null) {
      return <h1>Loading...</h1>;
    }

    if (isAuthenticated === false) {
      return <NotFound />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAdminAccess;
};
