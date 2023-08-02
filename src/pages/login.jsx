import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Login from "../components/login";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const index = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  if (isAuthenticated) router.replace("/");

  return (
    <>
      <Seo pageTitle="Login" />
      <Login />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
