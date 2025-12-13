import {
  Button,
  Container,
  Flex,
  PasswordInput,
  Switch,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { YMaps, Map, ZoomControl, Placemark } from "@pbe/react-yandex-maps";
import { useTranslation } from "react-i18next";

const phoneClean = (v) =>
  v.replace(/\D/g, "").replace(/^998/, "").replace(/^0/, "");

const schema = yup.object().shape({
  name: yup.string().required("register.validation.nameRequired"),
  phone: yup
    .string()
    .required("register.validation.phoneRequired")
    .transform((val) => (val ? phoneClean(val) : ""))
    .matches(/^\d{9}$/, "register.validation.phoneFormat"),
  password: yup
    .string()
    .required("register.validation.passwordRequired")
    .min(6, "register.validation.passwordMin"),
  address: yup.string().required("register.validation.addressRequired"),
  latitude: yup.string().required("register.validation.latitudeRequired"),
  longitude: yup.string().required("register.validation.longitudeRequired"),
  instagram: yup.string().nullable(),
  facebook: yup.string().nullable(),
  telegram: yup.string().nullable(),
  can_rent_books: yup.boolean(),
});

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [coords, setCoords] = useState(null);

  const MAP_API = import.meta.env.VITE_USER_MAP_API;
  console.log(MAP_API);

  const { mutate: registerM } = useMutation({
    mutationFn: (body) => API.post("/auth/register-library/", body),
  });

  const {
    register: formRegister,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      address: "",
      latitude: "",
      longitude: "",
      instagram: "",
      facebook: "",
      telegram: "",
      can_rent_books: false,
    },
  });

  const onSubmit = (data) => {
    const body = {
      library: {
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        can_rent_books: checked,
        social_media: {
          instagram: data.instagram,
          facebook: data.facebook,
          telegram: data.telegram,
        },
      },
      user: {
        name: data.name,
        phone: data.phone,
        password: data.password,
      },
    };

    registerM(body, {
      onSuccess: () => {
        notifications.show({ message: t("register.success") });
        navigate("/login");
      },
      onError: () => {
        notifications.show({ message: t("register.error"), color: "red" });
      },
    });
  };

  return (
    <Container py="lg">
      <div className="flex flex-col gap-1 items-center justify-center">
        <h1 className="text-[32px] text-[#00aeff]">{t("register.title")}</h1>
        <p className="text-[14px] text-gray-600">{t("register.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="lg" mt="lg">
          <div className="w-[50%] flex flex-col gap-4">
            <TextInput
              label={t("register.nameLabel")}
              placeholder={t("register.namePlaceholder")}
              {...formRegister("name")}
              error={errors.name && t(errors.name.message)}
            />

            <TextInput
              label={t("register.phoneLabel")}
              placeholder={t("register.phonePlaceholder")}
              {...formRegister("phone")}
              onBlur={(e) => setValue("phone", phoneClean(e.target.value))}
              error={errors.phone && t(errors.phone.message)}
            />

            <PasswordInput
              label={t("register.passwordLabel")}
              {...formRegister("password")}
              error={errors.password && t(errors.password.message)}
            />
          </div>
          <div className="w-[50%] flex flex-col gap-4">
            <TextInput
              label={t("register.instagramLabel")}
              placeholder={t("register.instagramPlaceholder")}
              {...formRegister("instagram")}
            />
            <TextInput
              label={t("register.facebookLabel")}
              placeholder={t("register.facebookPlaceholder")}
              {...formRegister("facebook")}
            />
            <TextInput
              label={t("register.telegramLabel")}
              placeholder={t("register.telegramPlaceholder")}
              {...formRegister("telegram")}
            />

            <Switch
              checked={checked}
              onChange={(e) => {
                setChecked(e.currentTarget.checked);
                setValue("can_rent_books", e.currentTarget.checked);
              }}
              color="teal"
              size="md"
              label={t("register.canRentBooks")}
              thumbIcon={
                checked ? (
                  <IconCheck size={12} stroke={3} />
                ) : (
                  <IconX size={12} stroke={3} />
                )
              }
            />
          </div>
        </Flex>

        <TextInput
          label={t("register.addressLabel")}
          {...formRegister("address")}
          error={errors.address && t(errors.address.message)}
          mt="md"
        />

        <div className="mt-[30px]">
          <Button
            onClick={() => {
              navigator.geolocation.getCurrentPosition((pos) => {
                setValue("latitude", pos.coords.latitude);
                setValue("longitude", pos.coords.longitude);
              });
            }}
          >
            {t("register.getCurrentLocation")}
          </Button>

          <div className="w-full h-[400px] mt-[20px]">
            <YMaps query={{ apikey: MAP_API }}>
              <Map
                defaultState={{
                  center: [41.2995, 69.2401],
                  zoom: 12,
                  controls: [],
                }}
                width="100%"
                height="400px"
                onClick={(e) => {
                  const clickedCoords = e.get("coords");
                  setCoords(clickedCoords);
                  setValue("latitude", clickedCoords[0]);
                  setValue("longitude", clickedCoords[1]);
                }}
              >
                <ZoomControl options={{ float: "right" }} />
                {coords && <Placemark geometry={coords} />}
              </Map>
            </YMaps>
          </div>

          <div className="flex gap-2 mt-[30px] w-full">
            <TextInput
              className="w-[50%]"
              label={t("register.latitudeLabel")}
              {...formRegister("latitude")}
              error={errors.latitude && t(errors.latitude.message)}
            />
            <TextInput
              className="w-[50%]"
              label={t("register.longitudeLabel")}
              {...formRegister("longitude")}
              error={errors.longitude && t(errors.longitude.message)}
            />
          </div>

          <div className="flex gap-2 mt-[20px] items-end justify-end">
            <Button onClick={() => navigate("/login")} type="button">
              {t("register.back")}
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {t("register.submit")}
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Register;
