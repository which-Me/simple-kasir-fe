import instance from "@/api/axios";
import { useAuth } from "@/contexts/Auth/AuthContext";
import { useMessage } from "@/contexts/Message/OpenMessage";
import { Button, Input } from "@heroui/react";
import Joi from "joi";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const [isVisible, setVisible] = useState(false);
  const { openMessage, messageComponents } = useMessage();
  const { setIsVerify, verifyMe } = useAuth();

  const inputValues = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .messages({
        "string.email": "Format email tidak valid",
        "string.empty": "Email wajib diisi",
        "any.required": "Email wajib diisi",
      }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password minimal harus 8 karakter",
      "string.empty": "Password wajib diisi",
      "any.required": "Password tidak boleh kosong",
    }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = Object.fromEntries(new FormData(e.target));
    const { error } = inputValues.validate(values);
    if (error) {
      openMessage(error.message, false);
      return;
    }

    await instance
      .post(import.meta.env.VITE_LOGIN, values, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          openMessage(response.data.message, true);
          console.log(response);
          setTimeout(() => {
            verifyMe();
          }, 1500);
        } else {
          openMessage(response.data.message, false);
        }
      })
      .catch((err) => {
        openMessage(err.response.data.message, false);
      })
      .finally(() => {
        setIsVerify(false);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      {messageComponents}
      <div className="">Login</div>
      <div className="form" id="form">
        <form
          className="flex flex-col max-w-[280px] min-w-[280px]"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            variant="underlined"
            name="email"
          />
          <br />
          <Input
            className="max-w-xs"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={() => setVisible((prev) => !prev)}
              >
                {isVisible ? (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="underlined"
            name="password"
          />
          <br />
          <Button color="primary" type="submit">
            submit
          </Button>
        </form>
      </div>
    </div>
  );
};
