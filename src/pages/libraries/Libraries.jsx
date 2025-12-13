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
  Grid as MantineGrid,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { useState, useMemo } from "react";
import {
  MapPin,
  BookOpen,
  ChevronUp,
  ChevronDown,
  Phone,
  AtSign,
  Search,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BOOKS_SHELF_IMAGE =
  "https://w0.peakpx.com/wallpaper/960/362/HD-wallpaper-library-background-beautiful-library-book.jpg";

const LibraryCard = ({ item, navigate }) => {
  const isActive = item.is_active;
  const { t } = useTranslation();
  return (
    <Paper
      key={item.id}
      shadow="xs"
      p="md"
      radius="sm"
      withBorder
      className="flex flex-col gap-3 transition duration-300 cursor-pointer bg-white h-full hover:shadow-xs"
      onClick={() => navigate(`/libDetail/${item.id}`)}
    >
      <div className="flex-shrink-0 relative w-full h-[160px]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-sm shadow-sm"
        />
        <Badge
          color="indigo"
          variant="filled"
          size="sm"
          radius="sm"
          className="absolute top-2 right-2 font-bold text-white"
          leftSection={<BookOpen className="w-3 h-3" />}
        >
          {item.total_books} Kitob
        </Badge>
      </div>

      <div className="flex-grow flex flex-col justify-between pt-1">
        <Group justify="space-between" align="start" mb="xs" wrap="nowrap">
          <Title
            order={5}
            className="text-lg font-extrabold text-blue-800 leading-tight line-clamp-1 "
          >
            {item.name}
          </Title>
          {isActive ? (
            <Badge
              color="green"
              variant="light"
              size="xs"
              radius="sm"
              className="flex-shrink-0"
            >
              🟢 Faol
            </Badge>
          ) : (
            <Badge
              color="red"
              variant="light"
              size="xs"
              radius="xl"
              className="flex-shrink-0"
            >
              🔴 Nofaol
            </Badge>
          )}
        </Group>

        <Stack gap={4} className="text-xs mt-1">
          <Group gap="xs" wrap="nowrap">
            <MapPin className="w-3 h-3 text-red-600 flex-shrink-0" />
            <Text c="gray.6" className="flex-grow line-clamp-1">
              {item.address}
            </Text>
          </Group>
          <Group gap="xs" wrap="nowrap">
            <Phone className="w-3 h-3 text-indigo-500 flex-shrink-0" />
            <Text c="gray.6">{item.phone}</Text>
          </Group>
        </Stack>

        <Button
          variant="light"
          color="indigo"
          fullWidth
          size="xs"
          mt="sm"
          className="font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/libDetail/${item.id}`);
          }}
        >
          {t("batafsil")}
        </Button>
      </div>
    </Paper>
  );
};

const LibraryListItem = ({ item, navigate }) => {
  const isActive = item.is_active;

  return (
    <Paper
      key={item.id}
      shadow="xs"
      p="lg"
      radius="sm"
      withBorder
      className="flex flex-col md:flex-row gap-6 transition duration-300 cursor-pointer bg-white hover:shadow-xs hover:shadow-indigo-100"
      onClick={() => navigate(`/libDetail/${item.id}`)}
    >
      <div className="flex-shrink-0 relative w-full md:w-[200px] h-[160px]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-sm shadow-xs"
        />
        <Badge
          color="indigo"
          variant="filled"
          size="md"
          radius="sm"
          className="absolute top-2 right-2 font-bold text-white"
          leftSection={<BookOpen className="w-3 h-3" />}
        >
          {item.total_books} Kitob
        </Badge>
      </div>

      <div className="flex-grow flex flex-col justify-between pt-1">
        <Group justify="space-between" align="start" mb="xs">
          <Title
            order={3}
            className="text-2xl font-extrabold text-blue-900 leading-tight"
          >
            {item.name}
          </Title>
          {isActive ? (
            <Badge
              color="green"
              variant="light"
              size="md"
              radius="sm"
              className="flex-shrink-0"
            >
              🟢 Faoliyatda
            </Badge>
          ) : (
            <Badge
              color="red"
              variant="light"
              size="md"
              radius="sm"
              className="flex-shrink-0"
            >
              🔴 Vaqtincha Nofaol
            </Badge>
          )}
        </Group>
        <Divider my="xs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm">
          <Group gap="xs" wrap="nowrap">
            <Phone className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <Text c="gray.7">
              <Text span fw={700} c="dark.7">
                Telefon:
              </Text>
              {item.phone}
            </Text>
          </Group>
          <Group gap="xs" wrap="nowrap">
            <AtSign className="w-4 h-4 text-cyan-500 flex-shrink-0" />
            <Text c="gray.7">
              <Text span fw={700} c="dark.7">
                Telegram:
              </Text>
              {item.telegram}
            </Text>
          </Group>
          <Group gap="xs" wrap="nowrap" className="sm:col-span-2 pt-1">
            <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
            <Text c="gray.8" className="flex-grow text-sm line-clamp-2">
              <Text span fw={700} c="dark.7">
                Manzil:
              </Text>
              {item.address}
            </Text>
            <Button
              component="a"
              href={`http://googleusercontent.com/maps.google.com/2{encodeURIComponent(
                item.address
              )}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              variant="light"
              color="red"
              radius="xl"
              size="xs"
              className="font-semibold flex-shrink-0"
            >
              Xaritada ko'rish
            </Button>
          </Group>
        </div>
      </div>
    </Paper>
  );
};

const Libraries = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");

  const navigate = useNavigate();

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

  const setSort = (key, direction) => {
    setSortBy(key);
    setSortDirection(direction);
  };

  const isSelected = (key, direction) =>
    sortBy === key && sortDirection === direction;

  const getSimpleSortButtonProps = (key, direction, label, Icon) => {
    const isButtonSelected = isSelected(key, direction);
    return {
      onClick: () => setSort(key, direction),
      variant: isButtonSelected ? "filled" : "light",
      color: isButtonSelected ? "indigo" : "gray",
      size: "xs",
      leftSection: <Icon className="w-4 h-4" />,
      children: label,
      fullWidth: true,
      justify: "flex-start",
    };
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const sortedAndFilteredLibraries = useMemo(() => {
    if (!libraries) return [];

    let processedLibraries = libraries.map(mapLibraryData);

    processedLibraries = processedLibraries.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    processedLibraries.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      let comparison = 0;

      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return sortDirection === "asc" ? comparison : comparison * -1;
    });

    return processedLibraries;
  }, [libraries, search, sortBy, sortDirection]);

  const LibrarySkeleton = () => (
    <Paper
      shadow="none"
      p="lg"
      radius="lg"
      withBorder
      className="flex flex-col md:flex-row gap-6 bg-white border-gray-200 animate-pulse h-[180px]"
    >
      <div className="flex-shrink-0 w-full md:w-[200px] h-full bg-gray-200 rounded-lg"></div>
      <div className="flex-grow space-y-3 pt-2">
        <div className="h-6 bg-gray-200 w-3/4 rounded-md"></div>
        <div className="h-3 bg-gray-200 w-1/4 rounded-md"></div>
        <div className="h-1 bg-gray-200 w-full my-2"></div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="h-4 bg-gray-200 rounded-md"></div>
          <div className="h-4 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </Paper>
  );

  const LibraryGridSkeleton = () => (
    <MantineGrid gutter="xl">
      <MantineGrid.Col span={{ base: 12, sm: 6, lg: 4 }}>
        <div className="h-[280px] bg-white border border-gray-200 rounded-xl animate-pulse"></div>
      </MantineGrid.Col>
      <MantineGrid.Col span={{ base: 12, sm: 6, lg: 4 }}>
        <div className="h-[280px] bg-white border border-gray-200 rounded-xl animate-pulse"></div>
      </MantineGrid.Col>
      <MantineGrid.Col span={{ base: 12, sm: 6, lg: 4 }}>
        <div className="h-[280px] bg-white border border-gray-200 rounded-xl animate-pulse"></div>
      </MantineGrid.Col>
    </MantineGrid>
  );

  return (
    <section className="bg-gray-50 min-h-screen">
      <Container size={1320} className="pt-[120px] pb-20">
        <div className="text-center mb-12">
          <Title
            order={1}
            className="text-5xl font-black text-slate-800 tracking-tight"
          >
            {t("portal")}
          </Title>
          <Text size="lg" c="gray.6" mt="xs" className="font-light">
            {t("manzilKitob")}
          </Text>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Paper
              shadow="xs"
              p="lg"
              radius="sm"
              withBorder
              className="bg-white border-slate-100 sticky top-20 shadow-slate-200/50"
            >
              <Group gap="xs" mb="md" className="border-b border-gray-100 pb-2">
                <Filter className="w-5 h-5 text-blue-800" />
                <Title order={4} className="text-blue-900 font-extrabold">
                  {t("filterBooks")}
                </Title>
              </Group>

              <Stack gap="xs" mt="md">
                <Text
                  size="xs"
                  fw={700}
                  c="slate.7"
                  className="mt-2 uppercase tracking-wider border-b pb-1"
                >
                  {t("nomiF")}
                </Text>

                <Group gap="xs">
                  <Button
                    {...getSimpleSortButtonProps("name", "asc", "A-Z", SortAsc)}
                  />
                  <Button
                    {...getSimpleSortButtonProps(
                      "name",
                      "desc",
                      "Z-A",
                      SortDesc
                    )}
                  />
                </Group>

                <Text
                  size="xs"
                  fw={700}
                  c="slate.7"
                  className="uppercase tracking-wider mt-3 border-b pb-1"
                >
                  {t("kitobSoni")}
                </Text>
                <Group gap="xs">
                  <Button
                    {...getSimpleSortButtonProps(
                      "total_books",
                      "asc",
                      "Kamdan koʻp",
                      ChevronUp
                    )}
                  />
                  <Button
                    {...getSimpleSortButtonProps(
                      "total_books",
                      "desc",
                      "Koʻpdan kam",
                      ChevronDown
                    )}
                  />
                </Group>
              </Stack>
            </Paper>
          </div>
          <div className="col-span-1 lg:col-span-3">
            <Group justify="space-between" align="center" mb="30px">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Kutubxona nomi yoki manzili bo'yicha aniq qidiruv..."
                size="md"
                leftSection={<Search className="w-4 h-4 text-indigo-400" />}
                className="w-full max-w-[700px] "
              />
              <Group gap="xs">
                <Button
                  variant={viewMode === "list" ? "filled" : "default"}
                  color="indigo"
                  size="md"
                  className="w-10"
                  onClick={() => handleViewChange("list")}
                >
                  <List className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "filled" : "default"}
                  color="indigo"
                  size="md"
                  className="w-10"
                  onClick={() => handleViewChange("grid")}
                >
                  <Grid className="w-5 h-5" />
                </Button>
              </Group>
            </Group>

            {isLoading ? (
              viewMode === "list" ? (
                <Stack gap="lg">
                  <LibrarySkeleton />
                  <LibrarySkeleton />
                  <LibrarySkeleton />
                </Stack>
              ) : (
                <LibraryGridSkeleton />
              )
            ) : sortedAndFilteredLibraries &&
              sortedAndFilteredLibraries.length > 0 ? (
              viewMode === "list" ? (
                <Stack gap="lg">
                  {sortedAndFilteredLibraries.map((item) => (
                    <LibraryListItem
                      key={item.id}
                      item={item}
                      navigate={navigate}
                    />
                  ))}
                </Stack>
              ) : (
                <MantineGrid gutter="lg">
                  {sortedAndFilteredLibraries.map((item) => (
                    <MantineGrid.Col
                      key={item.id}
                      span={{ base: 12, sm: 6, lg: 4 }}
                    >
                      <LibraryCard item={item} navigate={navigate} />
                    </MantineGrid.Col>
                  ))}
                </MantineGrid>
              )
            ) : (
              <Text
                align="center"
                size="md"
                mt="lg"
                p="sm"
                className="border border-gray-300 p-8 rounded-sm bg-white shadow-xs text-gray-700 "
              >
                Afsuski, <span className="text-red-600">"{search}"</span>{" "}
                so'rovi bo'yicha hech qanday kutubxona topilmadi. Qidiruvni
                qayta urinib ko'ring.
              </Text>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Libraries;
