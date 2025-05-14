import {
  Card,
  CardBody,
  CardFooter,
  Drawer,
  Image,
  useDisclosure,
} from "@heroui/react";
import { Badge } from "antd";
import { FaCartPlus } from "react-icons/fa";
import { ProductDrawer } from "./product-drawer";
import { useMemo, useState } from "react";
import { Formatter } from "@/contexts/Price/PriceFormmater";
import { useMessage } from "@/contexts/Message/OpenMessage";
import { useNavigate } from "react-router-dom";
import instance from "@/api/axios";
import { useAuth } from "@/contexts/Auth/AuthContext";
import { ImageValidation } from "@/contexts/ImageValidation/ImageValidation";

export const ProductCard = ({ datas }) => {
  const { openMessage, messageComponents } = useMessage();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [data, setData] = useState(null);
  const { user } = useAuth();

  const navigate = useNavigate();

  const onOrder = async (_, stock) => {
    if (_) {
      await instance
        .post(import.meta.env.VITE_ORDER_CREATE, {
          kode_barang: data.kode_barang,
          account_uuid: user.account_uuid,
          jumlah_barang: stock,
        })
        .then((response) => {
          openMessage(
            response.data.message,
            response.status === 200 ? true : false
          );
          if (response.status === 200) {
            navigate("/orders");
          }
        })
        .catch((err) => {
          openMessage(err.response.data.message, false);
        });
    }
  };

  const memoCard = useMemo(() => {
    return datas.map((item, index) => {
      const outOfStock = !item.stock;
      const imageUrl = ImageValidation(item.image);
      return (
        <Badge.Ribbon
          text={`discount ${item.diskon}%`}
          color="red"
          className={`z-10 ${!item.diskon && "hidden"} ${
            outOfStock && "opacity-50"
          }`}
          key={index}
        >
          <Card
            shadow="sm"
            radius="sm"
            className={`min-h-[250px] max-h-[250px] ${
              outOfStock && "pointer-events-none"
            }`}
          >
            <div className="relative">
              {outOfStock && (
                <p className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-md w-full text-center bg-default-50">
                  Out Of Stock
                </p>
              )}
              <Image
                alt={item.nama_barang}
                className={`w-full object-cover h-[120px] max-h-[120px] ${
                  outOfStock && "blur-[2px]"
                }`}
                radius="none"
                src={imageUrl}
                width="100%"
              />
            </div>
            <CardBody>
              <h1 className="font-bold line-clamp-1">{item.nama_barang}</h1>
              <p className="text-small line-clamp-2 text-default-700">
                {item.description}
              </p>
            </CardBody>
            <CardFooter className="text-small justify-between px-4">
              <div className="">
                {item.harga === item.harga_diskon ? (
                  <p className="text-sm text-red-500">
                    {Formatter(item.harga)}
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-red-500">
                      {Formatter(item.harga_diskon)}
                    </p>
                    <del className="italic text-sm text-red-500">
                      {Formatter(item.harga)}
                    </del>
                  </>
                )}
              </div>
              <FaCartPlus
                size={16}
                className={`${
                  outOfStock
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  setData({ key: index, ...item });
                  onOpen();
                }}
              />
            </CardFooter>
          </Card>
        </Badge.Ribbon>
      );
    });
  }, [datas]);

  return (
    <>
      <div className="w-4 justify-center items-center">{messageComponents}</div>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
        {memoCard}
        <Drawer
          backdrop="opaque"
          classNames={{
            body: "py-6",
            // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "max-md:max-w-[220px] text-foreground dark:bg-default-100",
            header: "border-b-[1px] border-[#292f46] max-md:text-center",
            footer: "border-t-[1px] border-[#292f46]",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
          isOpen={isOpen}
          radius="sm"
          onOpenChange={onOpenChange}
        >
          <ProductDrawer data={data} onOrder={onOrder} />
        </Drawer>
      </div>
    </>
  );
};
