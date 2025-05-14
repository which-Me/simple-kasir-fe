import { Formatter } from "@/contexts/Price/PriceFormmater";
import {
  Button,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { StockButton } from "../button/stock-button";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import axios from "axios";

export const ProductDrawer = ({ data, loadingButton, onOrder }) => {
  const [stock, setStock] = useState(1);
  // const navigate = useNavigate();

  const order = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500",
        cancelButton: "bg-red-500",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `you will order ${stock} product total price ${Formatter(
          hargaTotal()
        )}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Order",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          onOrder(true, stock);
        } else if (result.dismiss) {
          onOrder(false);
        }
      });
  };

  const hargaTotal = () => {
    return parseInt(data.harga_diskon * stock);
  };

  const onPlus = () => {
    if (stock < data.stock) {
      setStock((prev) => prev + 1);
    }
  };

  const onMinus = () => {
    if (stock > 1) {
      setStock((prev) => prev - 1);
    }
  };

  return (
    <>
      <DrawerContent>
        <DrawerHeader className="">
          <h1>Jumlah harga dan Stock</h1>
        </DrawerHeader>
        <DrawerBody>
          <div className="detail_wrapper border-b-[1px] border-[#292f46] py-4">
            <div>
              <h1 className="font-bold text-xl">{data.nama_barang}</h1>
            </div>
            <div>
              <p className="text-md text-default-800">
                Harga satuan :{" "}
                <span className="italic font-bold text-red-600">
                  {Formatter(data.harga_diskon)}
                </span>
              </p>
              <p className="text-sm text-default-500">Stock: {data.stock}</p>
              <StockButton
                maxChildren={data.stock}
                children={stock}
                onMinus={onMinus}
                onPlus={onPlus}
              />
            </div>
            <div className="mt-8">
              <p className="text-md text-default-800">
                Total harga :{" "}
                <span className="italic font-bold text-red-600">
                  {Formatter(hargaTotal())}
                </span>
              </p>
            </div>
            <div className="mt-4">
              <Button
                isLoading={loadingButton}
                color="primary"
                size="sm"
                className=""
                onPress={order}
              >
                Order
              </Button>
            </div>
          </div>
          <div>
            <h1 className="mb-3 text-sm text-default-400">Description</h1>
            <p>{data.description}</p>
          </div>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </>
  );
};
