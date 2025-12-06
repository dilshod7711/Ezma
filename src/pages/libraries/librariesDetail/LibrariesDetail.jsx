import { useQuery } from "@tanstack/react-query";
import { API } from "../../../api/api";
import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Badge,
  Button,
  Image,
  List,
  Box,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import {
  IconBook,
  IconMapPin,
  IconPhone,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

const LibrariesDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["libraries", id],
    queryFn: () => API.get(`/libraries/library/${id}`).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <Container mt="lg">
        <Text>Yuklanmoqda...</Text>
      </Container>
    );
  }

  const results = data?.results;

  if (isError || !results || !results.library || !results.phone) {
    return (
      <div className="mt-[100px]">
        <Container mt="lg">
          <Text color="red">
            Kutubxona ma'lumotlarini yuklashda xato yuz berdi.
          </Text>
        </Container>
      </div>
    );
  }

  const library = results.library;
  const books = results.books || [];
  const phone = results.phone;
  const totalBooks = results.total_books;

  const renderBookList = () => {
    if (!books || books.length === 0) {
      return (
        <Text>Bu kutubxonada hozircha kitoblar roʻyxati mavjud emas.</Text>
      );
    }

    return (
      <Grid gutter="xl">
        {books.map((book) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={book.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Box
                  h={200}
                  style={{
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={book.image || "/placeholder-book-open.jpg"}
                    alt="Book Cover Placeholder"
                    height={200}
                    fit="cover"
                    style={{ opacity: 0.8 }}
                  />
                </Box>
              </Card.Section>

              <Text weight={500} size="lg" mt="md" lineClamp={1}>
                {book.name}
              </Text>
              <Text size="sm" color="dimmed" lineClamp={1}>
                Muallif: {book.author}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    );
  };

  return (
    <div className="mt-[100px]">
      <Container size="xl">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={
                    library.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN5HZXRPc4IqBHLILRMFJ1-zqp065uOp-fEQ&s"
                  }
                  height={220}
                  alt="Library facade"
                  fit="cover"
                />
              </Card.Section>

              <Box mt="md">
                <Badge
                  color={library.is_active ? "green" : "red"}
                  variant="filled"
                  size="lg"
                >
                  {library.is_active ? "Faol" : "Faol emas"}{" "}
                </Badge>
              </Box>

              <List spacing="xs" size="sm" mt="md" center>
                <List.Item icon={<IconBook size={18} />}>
                  Kitoblar soni: **{totalBooks || 0}**
                </List.Item>
                <List.Item icon={<IconPhone size={18} />}>
                  **{phone}**
                </List.Item>
                <List.Item icon={<IconMapPin size={18} />}>
                  {library.address}
                </List.Item>
                <List.Item
                  icon={
                    library.can_rent_books ? (
                      <IconCheck size={18} color="teal" />
                    ) : (
                      <IconX size={18} color="red" />
                    )
                  }
                >
                  Kitob ijarasi mavjud emas:{" "}
                </List.Item>
              </List>

              <Button
                component="a"
                target="_blank"
                fullWidth
                mt="md"
                variant="light"
              >
                Google mapda ko'rish
              </Button>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            <Title
              order={2}
              mb="lg"
              style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
            >
              Kitoblar ({totalBooks || books.length})
            </Title>
            {renderBookList()}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default LibrariesDetail;
