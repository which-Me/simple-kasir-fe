import { Formatter } from "@/contexts/Price/PriceFormmater";
import { convertTime } from "@/contexts/Time/TimeConvert";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { useCallback, useMemo, useState } from "react";
import { DeleteIcon } from "../icons/delete-icon";

export const ReportTable = ({ datas }) => {
  // columns
  const columns = [
    { name: "USERNAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "ID ACCOUNT", uid: "account_uuid" },
    { name: "ID ORDER", uid: "id_order" },
    { name: "ID BARANG", uid: "kode_barang" },
    { name: "NAMA BARANG", uid: "nama_barang" },
    { name: "JUMLAH", uid: "jumlah" },
    { name: "TOTAL HARGA", uid: "total" },
    { name: "JUMLAH BAYAR", uid: "jumlah_bayar" },
    { name: "KEMBALIAN", uid: "uang_kembali" },
    { name: "TANGGAL BELI", uid: "tanggal_bayar" },
    { name: "ACTION", uid: "action" },
  ];
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "email":
        return (
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "account_uuid":
        return (
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "id_order":
        return (
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "kode_barang":
        return (
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "nama_barang":
        return (
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "jumlah":
        return (
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "total":
        return (
          <div>
            <p>{Formatter(cellValue)}</p>
          </div>
        );
      case "jumlah_bayar":
        return (
          <div>
            <p>{Formatter(cellValue)}</p>
          </div>
        );
      case "uang_kembali":
        return (
          <div>
            <p>{Formatter(cellValue)}</p>
          </div>
        );
      case "tanggal_bayar":
        return (
          <div>
            <p>{convertTime(cellValue)}</p>
          </div>
        );
      case "action":
        return (
          <div>
            <Tooltip color="danger" size="sm" content="Delete report">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
    }
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(datas.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return datas.slice(start, end);
  }, [page, datas]);

  return (
    <>
      <Table
        isStriped
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No data reports" items={items}>
          {(item) => (
            <TableRow key={item.tanggal_bayar}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
