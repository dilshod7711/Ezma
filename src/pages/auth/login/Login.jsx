import { Button, Container, Input, PasswordInput } from "@mantine/core";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../api/api";
import authStore from "../../../store/authStore";
import { useRef } from "react";
import { notifications } from "@mantine/notifications";

const Login = () => {
  const { login } = authStore();
  const numberRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const { mutate: loginMutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => API.post("/auth/login/", body),
  });

  function handleSubmitLogin(e) {
    e.preventDefault();

    const newUser = {
      password: passRef.current.value,
      phone: numberRef.current.value,
    };
    loginMutate(newUser, {
      onSuccess: (res) => {
        login(res.data.user, res.data.access);
        notifications.show({
          message: "Muvoffaqiyatli ",
        });
        navigate("/profile");
      },
      onError: () => {
        notifications.show({
          message: "Xatolik",
          color: "red",
        });
      },
    });
  }

  return (
    <div>
      <div className="flex ">
        <div className="bg-[#00aeff] h-screen w-[50%] flex items-center justify-center">
          <img
            className="w-[400px] h-[400px]"
            src="https://ezma-client.vercel.app/assets/login-img-DdFMbwye.svg"
            alt=""
          />
        </div>
        <div className="w-[50%] flex flex-col justify-center px-[40px] relative">
          <Link
            to="/"
            className="absolute top-[50px] left-[40px] flex gap-2  items-center justify-center border-1 border-gray-200 px-2 py-1 cursor-pointer rounded-[4px]"
          >
            {" "}
            <BsArrowBarLeft />
            Orqaga
          </Link>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl">Tizimga kirish</h1>
            <p>Platformadan to'liq foydalanish uchun tizimga kiring</p>
            <form
              onSubmit={handleSubmitLogin}
              className="flex flex-col gap-4 w-[600px] max-w-full"
            >
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[12px] font-medium text-gray-500">
                  Telefon raqam
                </label>

                <Input
                  ref={numberRef}
                  type="text"
                  placeholder="+998 __ ___ __ __"
                />
              </div>

              <PasswordInput
                ref={passRef}
                description="Parol"
                placeholder="Iltimos parolni kiriting"
              />
              <Button type="submit">Tizimga kiring</Button>
              <div className="flex items-center justify-center gap-2">
                <p>Hisobingiz yo'qmi?</p>
                <NavLink to="register" className="text-blue-700">
                  Ro'yxatdan o'ting
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
