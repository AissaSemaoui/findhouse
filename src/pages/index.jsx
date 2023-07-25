import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";
import { useEffect } from "react";

const index = () => {
  const fetchData = async () => {
    await fetch("/api/listings")
      .then(async (res) => {
        const response = await res.json();
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Seo pageTitle="Acasa" />
      <HomeMain />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
