import {
  Container,
  Input,
  Title,
  Text,
  Paper,
  Group,
  Badge,
  Button,
  Divider,
  Stack,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { useState } from "react";
import {
  MapPin,
  BookOpen,
  ChevronUp,
  ChevronDown,
  Phone,
  AtSign,
  Search,
  Filter,
  Users,
  Grid, 
  List, 
} from "lucide-react";
const BOOKS_SHELF_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAendo1O6F0NV0y0VhXuwZFyzgc_6wOAvLMw&s";

const Libraries = () => {
  const [search, setSearch] = useState("");

  const { data: libraries, isLoading } = useQuery({
    queryKey: ["libraries"],
    queryFn: () => API.get("/libraries/libraries").then((res) => res.data),
  });

  const mapLibraryData = (item) => ({
    id: item.id,
    name: item.name || "Noma'lum Kutubxona",
    is_active: item.is_active ?? true,
    total_books: item.total_books || 0,
    address: item.address || "Manzil ko'rsatilmagan",
    phone: item.phone || "+998 XX YYY YY YY",
    telegram: item.telegram || "@telegram_user",
    image: item.image || BOOKS_SHELF_IMAGE,
  });

  const filteredLibraries = libraries
    ?.map(mapLibraryData)
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  const LibrarySkeleton = () => (
    <Paper
      shadow="none"
      p="xl"
      radius="xl"
      withBorder
      className="flex flex-col md:flex-row gap-8 bg-white border-gray-200 animate-pulse h-[250px]"
    >
      <div className="flex-shrink-0 w-full md:w-[220px] h-full bg-gray-200 rounded-xl"></div>
      <div className="flex-grow space-y-4 pt-3">
        <div className="h-8 bg-gray-200 w-3/4 rounded-md"></div>
        <div className="h-4 bg-gray-200 w-1/4 rounded-md"></div>
        <div className="h-1 bg-gray-200 w-full my-3"></div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="h-5 bg-gray-200 rounded-md"></div>
          <div className="h-5 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </Paper>
  );

  return (
    <section className="bg-gray-50 min-h-screen">
      <Container size={1320} className="pt-[140px] pb-20">
        <div className="text-center mb-16">
          <Title
            order={1}
            className="text-6xl font-black text-slate-800 tracking-tight"
          >
            Markaziy Kutubxonalar Portali 🏛️
          </Title>
          <Text size="xl" c="gray.6" mt="sm" className="font-light">
            O'zbekiston bo'ylab eng yirik va faol kutubxona manzillari.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="col-span-1">
            <Paper
              shadow="xl"
              p="xl"
              radius="xl"
              withBorder
              className="bg-white border-slate-100 sticky top-24 shadow-slate-200/50"
            >
              <Group gap="xs" mb="md" className="border-b border-gray-100 pb-3">
                <Filter className="w-6 h-6 text-blue-800" />
                <Title order={3} className="text-blue-900 font-extrabold">
                  Saralash Mantiqi
                </Title>
              </Group>

              <Stack gap="sm" mt="lg">
                <Text
                  size="sm"
                  fw={700}
                  c="slate.7"
                  className="mt-2 uppercase tracking-wider"
                >
                  Nomi bo'yicha
                </Text>
                <Button
                  variant="subtle"
                  color="dark"
                  leftSection={<ChevronUp className="w-4 h-4" />}
                  fullWidth
                  justify="flex-start"
                >
                  Nomi (A-Z)
                </Button>
                <Button
                  variant="subtle"
                  color="dark"
                  leftSection={<ChevronDown className="w-4 h-4" />}
                  fullWidth
                  justify="flex-start"
                  mb="lg"
                >
                  Nomi (Z-A)
                </Button>

                <Text
                  size="sm"
                  fw={700}
                  c="slate.7"
                  className="uppercase tracking-wider"
                >
                  Kitoblar hajmi
                </Text>
                <Button
                  variant="subtle"
                  color="dark"
                  leftSection={<ChevronUp className="w-4 h-4" />}
                  fullWidth
                  justify="flex-start"
                >
                  Kamdan koʻp
                </Button>
                <Button
                  variant="subtle"
                  color="dark"
                  leftSection={<ChevronDown className="w-4 h-4" />}
                  fullWidth
                  justify="flex-start"
                >
                  Koʻpdan kam
                </Button>
              </Stack>

              <Divider my="xl" />

              <Button
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                fullWidth
                size="lg"
                leftSection={<Users className="w-5 h-5" />}
                className="font-bold shadow-xl shadow-indigo-200/50"
              >
                Faqat Faol Kutubxonalar
              </Button>
            </Paper>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <Group justify="space-between" align="center" mb="30px">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Kutubxona nomi yoki manzili bo'yicha aniq qidiruv..."
                size="lg"
                leftSection={<Search className="w-5 h-5 text-indigo-400" />}
                className="w-full max-w-[780px] "
              />
              <Group gap="xs">
                <Button
                  variant="filled" 
                  color="indigo"
                  size="md"
                  className="w-12 pointer-events-none" 
                >
                  <List className="w-5 h-5" />
                </Button>
                <Button
                  variant="default" 
                  color="indigo"
                  size="md"
                  className="w-12 pointer-events-none" 
                >
                  <Grid className="w-5 h-5" />
                </Button>
              </Group>
            </Group>

            {isLoading ? (
              <Stack gap="xl">
                <LibrarySkeleton />
                <LibrarySkeleton />
                <LibrarySkeleton />
              </Stack>
            ) : filteredLibraries && filteredLibraries.length > 0 ? (
              <Stack gap="xl">
                {filteredLibraries.map((item) => {
                  const isActive = item.is_active;

                  return (
                    <Paper
                      key={item.id}
                      shadow="xl"
                      p="xl"
                      radius="xl"
                      withBorder
                      className="flex flex-col md:flex-row gap-8 transition duration-500  cursor-pointer bg-white"
                    >
                      <div className="flex-shrink-0 relative w-full md:w-[250px] h-[200px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl shadow-lg"
                        />
                        <Badge
                          color="indigo"
                          variant="filled"
                          size="lg"
                          radius="xl"
                          className="absolute top-3 right-3 font-extrabold text-white"
                          leftSection={<BookOpen className="w-4 h-4" />}
                        >
                          {item.total_books} Kitob
                        </Badge>
                      </div>

                      <div className="flex-grow flex flex-col justify-between pt-1">
                        <Group justify="space-between" align="start" mb="xs">
                          <Title
                            order={3}
                            className="text-3xl font-extrabold text-blue-900 leading-tight"
                          >
                            {item.name}
                          </Title>
                          {isActive ? (
                            <Badge
                              color="green"
                              variant="light"
                              size="lg"
                              radius="xl"
                            >
                              🟢 Faoliyatda
                            </Badge>
                          ) : (
                            <Badge
                              color="red"
                              variant="light"
                              size="lg"
                              radius="xl"
                            >
                              🔴 Vaqtincha Nofaol
                            </Badge>
                          )}
                        </Group>

                        <Divider my="sm" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-md">
                          <Group gap="xs" wrap="nowrap">
                            <Phone className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                            <Text c="gray.7">
                              <Text span fw={700} c="dark.7">
                                Telefon:
                              </Text>{" "}
                              {item.phone}
                            </Text>
                          </Group>

                          <Group gap="xs" wrap="nowrap">
                            <AtSign className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                            <Text c="gray.7">
                              <Text span fw={700} c="dark.7">
                                Telegram:
                              </Text>{" "}
                              {item.telegram}
                            </Text>
                          </Group>

                          <Group
                            gap="md"
                            wrap="nowrap"
                            className="sm:col-span-2 pt-2"
                          >
                            <MapPin className="w-6 h-6 text-red-600 flex-shrink-0" />
                            <Text c="gray.8" className="flex-grow text-md">
                              <Text span fw={700} c="dark.7">
                                Manzil:
                              </Text>{" "}
                              {item.address}
                            </Text>
                            <Button
                              component="a"
                              href={`https://www.google.com/maps/search/?api=1&query={encodeURIComponent(
                                item.address
                              )}`}
                              target="_blank"
                              variant="gradient"
                              gradient={{ from: "red", to: "orange", deg: 135 }}
                              radius="xl"
                              size="sm"
                              className="font-semibold"
                            >
                              Xaritada ko'rish
                            </Button>
                          </Group>
                        </div>
                      </div>
                    </Paper>
                  );
                })}
              </Stack>
            ) : (
              <Text
                align="center"
                size="xl"
                color="red"
                mt="xl"
                className="border-2 border-red-300 p-12 rounded-xl bg-white shadow-lg text-gray-700"
              >
                ❌ Afsuski, "{search}" so'rovi bo'yicha hech qanday kutubxona
                topilmadi. Qidiruvni qayta urinib ko'ring.
              </Text>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Libraries;
