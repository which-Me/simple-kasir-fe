import { message } from "antd";
import { useContext, createContext } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messageApi, messageComponents] = message.useMessage();

  const openMessage = (message, type) => {
    messageApi.destroy();
    messageApi.open({
      type: type ? "success" : "error",
      content: message,
    });
  };

  return (
    <MessageContext.Provider value={{ openMessage, messageComponents }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  return useContext(MessageContext);
};
