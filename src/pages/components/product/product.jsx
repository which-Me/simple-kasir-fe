import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import { Loading } from "../loading/loading";
import { useMessage } from "@/contexts/Message/OpenMessage";
import instance from "@/api/axios";

export const Product = () => {
  const [data, setData] = useState(null);
  const { openMessage, messageComponents } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      await instance
        .post(import.meta.env.VITE_FETCH_ALL_PRODUCT)
        .then((response) => {
          if (response.status === 200) {
            setData(response.data && response.data);
          } else {
            openMessage(response.data.message, false);
          }
        })
        .catch((err) => {
          openMessage(err.response.data.message, false);
        });
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="w-4 justify-center items-center">{messageComponents}</div>
      <div className="p-4">
        {data ? <ProductCard datas={data.data || []} /> : <Loading />}
      </div>
    </>
  );
};
