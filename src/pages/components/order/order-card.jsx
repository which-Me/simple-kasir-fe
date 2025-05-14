import { Formatter } from "@/contexts/Price/PriceFormmater";
import { Button, Card, Image } from "@heroui/react";
import { TagPayment } from "../Tag/TagPayment";
import { useMessage } from "@/contexts/Message/OpenMessage";
import { convertTime } from "@/contexts/Time/TimeConvert";
import { useMemo } from "react";
import instance from "@/api/axios";
import { ImageValidation } from "@/contexts/ImageValidation/ImageValidation";

export const OrderCard = ({ datas }) => {
  const { openMessage, messageComponents } = useMessage();

  const payment = async (id_order) => {
    const saldo = parseInt(prompt("pay"));

    await instance
      .post(import.meta.env.VITE_REPORT_CREATE, {
        id_order: id_order,
        pay: saldo,
      })
      .then((result) =>
        openMessage(result.data.message, result.status === 200 ? true : false)
      )
      .catch((err) => openMessage(err.response.data.message, false));
  };

  const memoCard = useMemo(() => {
    return datas.map((item, index) => {
      const imageUrl = ImageValidation(item.image);
      return (
        <Card
          key={index}
          shadow="sm"
          radius="sm"
          className="max-w-[700px] min-h-[70px]  border-default-100 mb-2"
        >
          <div className="flex items-stretch ">
            {/* Gambar di kiri */}
            <div className="flex-shrink-0 w-[100px] h-full">
              <Image
                alt="Album cover"
                className="object-cover w-full h-full"
                radius="none"
                src={imageUrl}
                width={100}
                height={80}
                sizes="100vw"
              />
            </div>

            {/* Konten di kanan */}
            <div className="flex flex-col justify-between flex-grow p-4  relative">
              <p className="absolute top-1 right-2 text-sm max-md:text-[0.7rem] text-default-500">
                {convertTime(item.tanggal_order)}
              </p>
              <div className="">
                <p>{item.nama_barang}</p>
              </div>
              <div className="flex justify-start flex-col flex-1">
                <p className="text-sm text-default-500">
                  jumlah: <span>{item.jumlah}</span>
                </p>
                <p className="text-md">
                  harga satuan: <span>{Formatter(item.harga_diskon)}</span>
                </p>
                <p>
                  harga total: <span>{Formatter(item.total)}</span>
                </p>
              </div>
              <div className="asidee flex justify-between flex-1 items-end">
                <TagPayment status={item.status_pembayaran} />
                <Button
                  color="primary"
                  size="sm"
                  onPress={() => payment(item.id_order)}
                >
                  Pay
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    });
  }, [datas]);
  return (
    <>
      <div className="w-4 justify-center items-center">{messageComponents}</div>
      {memoCard}
    </>
  );
};
