import instance from "@/api/axios";
import { useEffect, useState } from "react";
import { AccountTable } from "./account-table";
import { Loading } from "../loading/loading";
import { useMessage } from "@/contexts/Message/OpenMessage";

// temp code

export const Account = () => {
  const [data, setData] = useState(null);
  const { openMessage, messageComponents } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      await instance
        .post(import.meta.env.VITE_ACCOUNT_GETALL)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setData(response.data.data);
          } else {
            openMessage(response.data.message, false);
          }
        })
        .catch((err) => {
          console.error(err);
          openMessage(err.response.data.message, false);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="w-4 justify-center items-center">{messageComponents}</div>
      {data ? <AccountTable datas={data} /> : <Loading />}
    </>
  );
};
