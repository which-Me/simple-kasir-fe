import { useEffect, useState } from "react";
import { OrderCard } from "./order-card";
import { Loading } from "../loading/loading";
import { useMessage } from "@/contexts/Message/OpenMessage";
import instance from "@/api/axios";
import { useAuth } from "@/contexts/Auth/AuthContext";

export const Order = () => {
  const [data, setData] = useState(null);
  const { openMessage, messageComponents } = useMessage();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      await instance
        .post(import.meta.env.VITE_ORDER_GETALL, {
          account_uuid: user.account_uuid,
        })
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
  console.log("order", data);

  return (
    <>
      <div className="w-4 justify-center items-center">{messageComponents}</div>
      <div className="p-4">
        {data ? <OrderCard datas={data.data || []} /> : <Loading />}
      </div>
    </>
  );
};
