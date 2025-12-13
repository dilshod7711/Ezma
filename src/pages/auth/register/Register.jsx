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

const phoneClean = (v) =>
  v.replace(/\D/g, "").replace(/^998/, "").replace(/^0/, "");

const schema = yup.object().shape({
  name: yup.string().required("Ismni kiriting"),
  phone: yup
    .string()
    .required("Telefon raqamni kiriting")
    .transform((val) => (val ? phoneClean(val) : ""))
    .matches(/^\d{9}$/, "Telefon raqam formati: 901234567"),
  password: yup
    .string()
    .required("Parolni kiriting")
    .min(6, "Parol kamida 6 belgidan iborat bo'lishi kerak"),
  address: yup.string().required("Manzilni kiriting"),
  latitude: yup.string().required("Kenglikni kiriting"),
  longitude: yup.string().required("Uzunlikni kiriting"),
  instagram: yup.string().nullable(),
  facebook: yup.string().nullable(),
  telegram: yup.string().nullable(),
  can_rent_books: yup.boolean(),
});

const Register = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [coords, setCoords] = useState(null);

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
        notifications.show({ message: "Muvoffaqiyatli" });
        navigate("/login");
      },
      onError: () => {
        notifications.show({ message: "Xatolik", color: "red" });
      },
    });
  };

  return (
    <Container py="lg">
      <div className="flex flex-col gap-1 items-center justify-center">
        <h1 className="text-[32px] text-[#00aeff]">
          Kutubxonachi ro'yxatdan o'tish
        </h1>
        <p className="text-[14px] text-gray-600">
          Kutubxona ma'lumotlarini to'ldiring
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="lg" mt="lg">
          <div className="w-[50%] flex flex-col gap-4">
            <TextInput
              label="Ism"
              placeholder="Ism"
              {...formRegister("name")}
              error={errors.name?.message}
            />

            <TextInput
              label="Telefon raqam"
              placeholder="90 447 1907"
              {...formRegister("phone")}
              onBlur={(e) => setValue("phone", phoneClean(e.target.value))}
              error={errors.phone?.message}
            />

            <PasswordInput
              label="Parol"
              {...formRegister("password")}
              error={errors.password?.message}
            />
          </div>
          <div className="w-[50%] flex flex-col gap-4">
            <TextInput
              label="Instagram"
              placeholder="username"
              {...formRegister("instagram")}
            />
            <TextInput
              label="Facebook"
              placeholder="username"
              {...formRegister("facebook")}
            />
            <TextInput
              label="Telegram"
              placeholder="username"
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
              label="Kitob ijarasi"
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
          label="Manzil"
          {...formRegister("address")}
          error={errors.address?.message}
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
            Hozirgi joylashuvni olish
          </Button>

          <div className="w-full h-[400px] mt-[20px]">
            <YMaps query={{ apikey: "3d763bcd-1d38-4d2c-bda0-41deb0997e82" }}>
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
              label="Kenglik"
              {...formRegister("latitude")}
              error={errors.latitude?.message}
            />
            <TextInput
              className="w-[50%]"
              label="Uzunlik"
              {...formRegister("longitude")}
              error={errors.longitude?.message}
            />
          </div>

          <div className="flex gap-2 mt-[20px] items-end justify-end">
            <Button onClick={() => navigate("/login")} type="button">
              Ortga
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Ro'yxatdan o'tish
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Register;
