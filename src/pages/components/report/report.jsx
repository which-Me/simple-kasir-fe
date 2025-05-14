import { useMessage } from "@/contexts/Message/OpenMessage";
import { useEffect, useState } from "react";
import { ReportTable } from "./report-table";
import { Loading } from "../loading/loading";
import instance from "@/api/axios";

export const Report = () => {
  const [data, setData] = useState(null);
  const { openMessage, messageComponents } = useMessage();

  useEffect(() => {
    const fecthData = async () => {
      await instance
        .post(import.meta.env.VITE_REPORT_GETALL)
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
    fecthData();
  }, []);
  console.log(data);

  return (
    <>
      <div className="w-4 justify-center items-center">{messageComponents}</div>
      {data ? <ReportTable datas={data} /> : <Loading />}
    </>
  );
};
