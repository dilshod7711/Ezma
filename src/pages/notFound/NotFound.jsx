import React from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Flex,
  Stack,
  ThemeIcon,
  Anchor,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import {
  IconBookOff,
  IconHome,
  IconSearch,
  IconArrowLeft,
} from "@tabler/icons-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-95 text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-repeat opacity-5"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="1" fill="#00aeff"/></svg>')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-80"></div>

      <Container size="xl" className="relative z-10 mt-18">
        <Stack align="center" spacing="xl" className="py-10">
          <ThemeIcon
            size={140}
            radius="full"
            variant="filled"
            color="red"
            className="shadow-2xl shadow-red-500/50 transform hover:scale-110 transition-transform duration-500 animate-slow-pulse"
          >
            <IconBookOff size={80} strokeWidth={1} />
          </ThemeIcon>

          <Title
            order={1}
            className="text-9xl md:text-[250px] font-black text-transparent bg-clip-text 
                       bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 
                       tracking-tighter select-none"
            style={{
              lineHeight: 1,
              textShadow:
                "8px 8px 0px rgba(0, 0, 0, 0.4), 10px 10px 0px rgba(0, 0, 255, 0.2)",
            }}
          >
            404
          </Title>

          <Title
            order={2}
            className="text-5xl md:text-7xl font-extrabold text-white text-center mt-6"
          >
            Sahifa Koinotda Yo'qolgan!
          </Title>

          <Text
            size="xl"
            className="text-gray-300 text-center max-w-3xl leading-relaxed mt-4"
          >
            Bu kitob manzili bizning server katalogimizda topilmadi. U elektron
            adabiyotlar olamidagi noma'lum sahifaga tushib qolgan bo'lishi
            mumkin. Quyidagi amallarni bajaring, iltimos.
          </Text>

          <Flex
            direction={{ base: "column", sm: "row" }}
            gap="xl"
            justify="center"
            className="mt-10"
          >
            <Button
              component={NavLink}
              to="/"
              size="xl"
              leftIcon={<IconHome size={24} />}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                         text-white font-bold shadow-2xl shadow-blue-500/50 transform hover:scale-[1.02] 
                         transition-all duration-300 px-10 py-4"
              style={{ borderRadius: "12px" }}
            >
              Bosh Sahifaga Qaytish
            </Button>

            <Button
              size="xl"
              variant="outline"
              color="gray"
              leftIcon={<IconSearch size={24} />}
              className="font-bold border-2 border-gray-400 text-gray-300 hover:bg-gray-700 
                         transform hover:scale-[1.02] transition-all duration-300 px-10 py-4"
              style={{ borderRadius: "12px" }}
            >
              Boshqa Kitob Qidirish
            </Button>
          </Flex>

          <Text size="sm" className="mt-10 text-gray-500">
            <Flex gap="xs">
              <IconArrowLeft
                className="text-cyan-400 hover:text-cyan-300 hover:underline font-bold inline-flex items-center gap-2 transition-colors duration-200"
                size={18}
                strokeWidth={2.5}
              />
              <Anchor
                href="#"
                className="text-cyan-400 hover:text-cyan-300 hover:underline font-bold inline-flex items-center gap-2 transition-colors duration-200"
              >
                Oxirgi Ko'rilgan Sahifaga Qaytish
              </Anchor>
            </Flex>
          </Text>

          <Text size="lg" weight={700} className="mt-20 text-cyan-400">
            📚 <span className="font-extrabold">Ezma</span> — Raqamli Kutubxona
            Portali
          </Text>
        </Stack>
      </Container>
    </div>
  );
};

export default NotFound;
