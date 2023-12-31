import { useSelector } from "react-redux";

import NotFound from "../components/404";
import Loader from "../components/common/Loader";

export const withAdminAccess = async (WrappedComponent) => {
  const WithAdminAccess = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // useEffect(() => {
    //   if (isAuthenticated === false) {
    //     router.replace("/");
    //   }
    // }, [isAuthenticated, router]);

    if (isAuthenticated === null) {
      return <Loader />;
    }

    if (isAuthenticated === false) {
      return <NotFound />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAdminAccess;
};
