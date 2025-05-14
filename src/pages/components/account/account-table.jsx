import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@heroui/react";
import { useCallback, useMemo, useState } from "react";
import { DeleteIcon } from "../icons/delete-icon";
import { ImageValidation } from "@/contexts/ImageValidation/ImageValidation";
import { useAuth } from "@/contexts/Auth/AuthContext";
import { Tag } from "antd";

export const AccountTable = ({ datas }) => {
  const { user } = useAuth();

  // columns
  const columns = [
    // { name: "ID ACCOUNT", uid: "account_uuid" },
    { name: "USERNAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "ACTION", uid: "action" },
  ];

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      //   case "account_uuid":
      //     return (
      //       <div>
      //         <p>{cellValue}</p>
      //       </div>
      //     );
      case "name":
        return (
          <div className="min-w-[450px] flex gap-10 items-center ">
            <User
              className=""
              avatarProps={{
                radius: "full",
                isBordered: true,
                src: ImageValidation(item.avatar),
              }}
              description={
                <div>
                  <p className="mb-1">{item.email}</p>
                  <p>{item.account_uuid}</p>
                </div>
              }
              name={cellValue}
            />
            {user.account_uuid === item.account_uuid && (
              <p className="text-primary text-[0.8rem]">Current Account</p>
            )}
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "action":
        return (
          <div>
            <Tooltip color="danger" size="sm" content="Delete account">
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
          wrapper: "min-h-[222px] ",
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
        <TableBody emptyContent="No data account" items={items}>
          {(item) => (
            <TableRow key={item.account_uuid}>
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
