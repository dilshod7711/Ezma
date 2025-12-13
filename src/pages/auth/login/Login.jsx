import { Button, Input, PasswordInput } from "@mantine/core";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../api/api";
import authStore from "../../../store/authStore";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const phoneClean = (v) => "+998" + v.replace(/\D/g, "").replace(/^998/, "");
const schema = yup.object({
  phone: yup
    .string()
    .required("Telefon raqamni kiriting")
    .matches(/^\+998\d{9}$/, "Format: +998901234567"),
  password: yup
    .string()
    .required("Parolni kiriting")
    .min(6, "Parol kamida 6 belgidan iborat bo‘lsin"),
});
const Login = () => {
  const { login, isAuth } = authStore();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (body) => API.post("/auth/login/", body),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { phone: "", password: "" },
  });
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        login(res.data.user, res.data.access);
        notifications.show({ message: "Muvaffaqiyatli" });
        navigate("/profile");
      },
      onError: () => {
        notifications.show({
          message: "Telefon yoki parol xato",
          color: "red",
        });
      },
    });
  };
  if (isAuth) return <Navigate to="/profile" />;
  return (
    <div className="flex h-screen">
      {" "}
      <div className="bg-[#00aeff] w-1/2 flex items-center justify-center">
        {" "}
        <img
          className="w-[400px]"
          src="https://ezma-client.vercel.app/assets/login-img-DdFMbwye.svg"
          alt=""
        />{" "}
      </div>{" "}
      <div className="w-1/2 flex flex-col justify-center px-10 relative">
        {" "}
        <Link
          to="/"
          className="absolute top-10 left-10 flex gap-2 items-center border px-2 py-1 rounded"
        >
          {" "}
          <BsArrowBarLeft /> Orqaga{" "}
        </Link>{" "}
        <h1 className="text-5xl mb-2">Tizimga kirish</h1>{" "}
        <p className="mb-6">Hisobingizga kiring</p>{" "}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {" "}
          <div>
            {" "}
            <Input
              {...register("phone")}
              placeholder="+998901234567"
              onBlur={(e) =>
                setValue("phone", phoneClean(e.target.value), {
                  shouldValidate: true,
                })
              }
            />{" "}
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone.message}</p>
            )}{" "}
          </div>{" "}
          <div>
            {" "}
            <PasswordInput {...register("password")} placeholder="Parol" />{" "}
            {errors.password && (
              <p className="text-red-600 text-sm">
                {" "}
                {errors.password.message}{" "}
              </p>
            )}{" "}
          </div>{" "}
          <Button type="submit" loading={isSubmitting}>
            {" "}
            Kirish{" "}
          </Button>{" "}
          <p className="text-center">
            {" "}
            Hisobingiz yo‘qmi?{" "}
            <NavLink to="/register" className="text-blue-600">
              {" "}
              Ro‘yxatdan o‘ting{" "}
            </NavLink>{" "}
          </p>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
export default Login;
