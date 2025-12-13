import { useTranslation } from "react-i18next";
import { Button, Container, Input, PasswordInput } from "@mantine/core";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../api/api";
import authStore from "../../../store/authStore";
import { useRef } from "react";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const phoneClean = (v) => v.replace(/\s+/g, "").replace(/-/g, "");

const schema = yup.object().shape({
  phone: yup
    .string()
    .required("Telefon raqamni kiriting")
    .transform((val) => (val ? phoneClean(val) : ""))
    .matches(/^\+998\d{9}$/, "Telefon raqam formati: +998901234567"),
  password: yup
    .string()
    .required("Parolni kiriting")
    .min(6, "Parol kamida 6 belgidan iborat bo'lishi kerak"),
});

const Login = () => {
  const { t } = useTranslation();
  const { login, isAuth } = authStore();
  const numberRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const { mutate: loginMutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => API.post("/auth/login/", body),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { phone: "", password: "" },
  });

  const onSubmit = (data) => {
    const newUser = { phone: data.phone, password: data.password };

    loginMutate(newUser, {
      onSuccess: (res) => {
        login(res.data.user, res.data.access);
        notifications.show({ message: t("login.success") });
        navigate("/profile");
      },
      onError: () => {
        notifications.show({ message: t("login.error"), color: "red" });
      },
    });
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="flex">
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
          className="absolute top-[50px] left-[40px] flex gap-2 items-center justify-center border-1 border-gray-200 px-2 py-1 cursor-pointer rounded-[4px]"
        >
          <BsArrowBarLeft />
          {t("login.back")}
        </Link>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl">{t("login.title")}</h1>
          <p>{t("login.subtitle")}</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-[600px] max-w-full"
          >
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[12px] font-medium text-gray-500">
                {t("login.phoneLabel")}
              </label>
              <Input
                {...register("phone")}
                ref={(e) => {
                  register("phone").ref(e);
                  numberRef.current = e;
                }}
                type="text"
                placeholder={t("login.phonePlaceholder")}
                onBlur={(e) => {
                  const raw = phoneClean(e.target.value);
                  setValue("phone", raw, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  if (numberRef.current) numberRef.current.value = raw;
                }}
                error={errors.phone?.message}
              />
              {errors.phone && (
                <span className="text-red-600 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-[12px] font-medium text-gray-500">
                {t("login.passwordLabel")}
              </label>
              <PasswordInput
                {...register("password")}
                ref={(e) => {
                  register("password").ref(e);
                  passRef.current = e;
                }}
                placeholder={t("login.passwordPlaceholder")}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button type="submit" loading={isSubmitting}>
              {t("login.submit")}
            </Button>

            <div className="flex items-center justify-center gap-2">
              <p>{t("login.noAccount")}</p>
              <NavLink to="/register" className="text-blue-700">
                {t("login.register")}
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
