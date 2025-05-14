import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Tag } from "antd";
export const TagPayment = ({ status }) => {
  switch (true) {
    case status === 0:
      return (
        <Tag
          className="rounded-md"
          color="success"
          icon={<CheckCircleOutlined />}
        >
          Success
        </Tag>
      );
    case status === 1:
      return (
        <Tag
          className="rounded-md"
          color="warning"
          icon={<ClockCircleOutlined />}
        >
          Pending
        </Tag>
      );
    case status === 2:
      return (
        <Tag className="rounded-md" color="error" icon={<CloseCircleFilled />}>
          Canceled
        </Tag>
      );
  }
};
