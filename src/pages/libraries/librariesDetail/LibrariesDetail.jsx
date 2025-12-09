import { useQuery } from "@tanstack/react-query";
import { API } from "../../../api/api";
import {
  Container,
  Skeleton,
  Badge,
  Group,
  Text,
  Title,
  Grid,
  Card,
  Stack,
  Divider,
  Chip,
  Box,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  BookOpen,
  Building2,
  UserCheck,
  Package,
} from "lucide-react";

const InfoItem = ({ Icon, title, value, color }) => (
  <Group wrap="nowrap" gap="sm">
    <Icon size={20} className={`text-${color}-600 shrink-0`} />
    <Stack gap={2}>
      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
        {title}
      </Text>
      <Text fw={500} lineClamp={1}>
        {value}
      </Text>
    </Stack>
  </Group>
);

const LibrariesDetail = () => {
  const { id } = useParams();

  const { data: libraryData, isLoading } = useQuery({
    queryKey: ["library", id],
    queryFn: () => API.get(`/libraries/library/${id}`).then((res) => res.data),
  });

  const library = libraryData?.results?.library;
  const books = libraryData?.results?.books || [];

  if (isLoading) {
    return (
      <Container size="xl" mt={100}>
        <Skeleton height={300} radius="lg" />
        <Grid gutter="xl" mt="xl">
          <Grid.Col span={4}>
            <Skeleton height={150} />
          </Grid.Col>
          <Grid.Col span={8}>
            <Skeleton height={150} />
          </Grid.Col>
        </Grid>
        <Skeleton height={40} mt="xl" width="50%" />
        <Grid gutter="md" mt="md">
          {[...Array(4)].map((_, i) => (
            <Grid.Col key={i} span={{ base: 12, md: 6, lg: 3 }}>
              <Skeleton height={250} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    );
  }

  const address = library?.address || "Manzil mavjud emas";
  const phone = libraryData?.results?.phone || "Telefon raqam yo'q";
  const totalBooks = libraryData?.results?.total_books || 0;
  const createdAt = library?.created_at?.split("T")[0] || "Noma'lum";
  const isActive = library?.is_active;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <Container size="xl">
        <Card
          withBorder
          radius="sm"
          p={0}
          className="overflow-hidden bg-white "
        >
          <Grid gutter={0}>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Box className="h-[300px] md:h-full">
                <img
                  src="https://ezma-client.vercel.app/assets/library-CY0z204p.webp"
                  alt={library?.name}
                  className="w-full h-[430px]  rounded-xl ml-4 mt-6"
                />
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }} p={{ base: "xl", md: "3rem" }}>
              <Stack gap="xl">
                <Box>
                  <Title
                    order={1}
                    className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight"
                  >
                    {library?.name || "Kutubxona Nomi"}
                  </Title>
                  <Text size="md" c="gray" mt={4}>
                    Rasmiy kutubxona haqidagi ma'lumotlar
                  </Text>
                </Box>
                <Divider />
                <Grid gutter="xl">
                  {" "}
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                        Manzil
                      </Text>
                      <Text fw={500} lineClamp={1}>
                        {address}
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                        Telefon Raqam
                      </Text>
                      <Text fw={500} lineClamp={1}>
                        {phone}
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Stack gap={2}>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                        Tashkil etilgan
                      </Text>
                      <Text fw={500} lineClamp={1}>
                        {createdAt}
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Stack gap={2}>
                      <Text
                        size="xs"
                        radius="sm"
                        c="dimmed"
                        tt="uppercase"
                        fw={700}
                      >
                        Holat
                      </Text>
                      <Chip
                        checked={isActive}
                        color={isActive ? "green" : "red"}
                        variant="filled"
                        size="sm"
                        radius="sm"
                      >
                        {isActive ? "Faol" : "Faol emas"}
                      </Chip>
                    </Stack>
                  </Grid.Col>
                </Grid>
                <Divider />
                <Card withBorder radius="md" bg="blue.0">
                  <Group justify="space-between">
                    <Group gap="xs">
                      <BookOpen size={24} className="text-blue-600" />
                      <Title order={4} className="text-blue-700">
                        Jami Kitoblar Soni
                      </Title>
                    </Group>
                    <Badge
                      color="blue"
                      radius="sm"
                      size="xl"
                      variant="filled"
                      py="md"
                    >
                      {totalBooks} ta
                    </Badge>
                  </Group>
                </Card>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>

        <div className="mt-20">
          <Title
            order={2}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            📚 Mavjud Kitoblar ({books.length} ta)
          </Title>

          {books.length === 0 ? (
            <Card
              withBorder
              radius="sm"
              p="xl"
              mt="lg"
              className="text-center bg-white shadow-sm"
            >
              <Text size="lg" c="dimmed">
                Bu kutubxonada hali kitoblar qo'shilmagan.
              </Text>
            </Card>
          ) : (
            <Grid gutter="xl">
              {books.map((book) => (
                <Grid.Col
                  span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                  key={book.id}
                >
                  <Card
                    withBorder
                    shadow="xs"
                    p="lg"
                    mt="lg"
                    className="h-full hover:shadow-xs hover:shadow-indigo-50 transition-all duration-300 group cursor-pointer"
                  >
                    <Card.Section>
                      <div className="bg-gray-100  w-full h-48 flex flex-col items-center justify-center p-4">
                        <Package size={48} className="text-indigo-400" />
                        <Text size="sm" c="dimmed" mt="xs">
                          Kitob Rasmi
                        </Text>
                      </div>
                    </Card.Section>

                    <Stack mt="md" gap="xs">
                      <Title
                        order={4}
                        className="line-clamp-2 font-bold text-gray-800 group-hover:text-indigo-600 transition-colors"
                        title={book.name}
                      >
                        {book.name}
                      </Title>

                      <Divider variant="dashed" my={4} />

                      <Group gap={4}>
                        <Text size="xs" c="dimmed">
                          Muallif:
                        </Text>
                        <Text size="sm" fw={500} className="line-clamp-1">
                          {book.author}
                        </Text>
                      </Group>

                      <Group gap={4}>
                        <Text size="xs" c="dimmed">
                          Nashriyot:
                        </Text>
                        <Text size="sm" fw={500} className="line-clamp-1">
                          {book.publisher}
                        </Text>
                      </Group>

                      <Group justify="space-between" mt="md">
                        <Badge
                          color="blue"
                          variant="light"
                          size="lg"
                          radius="sm"
                          leftSection={<BookOpen size={14} />}
                        >
                          {book.quantity_in_library} dona
                        </Badge>
                        <Badge
                          color="green"
                          size="md"
                          radius="sm"
                          variant="dot"
                        >
                          Mavjud
                        </Badge>
                      </Group>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LibrariesDetail;
