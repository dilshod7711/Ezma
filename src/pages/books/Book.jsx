import {
  Container,
  Input,
  Title,
  Text,
  SimpleGrid,
  Center,
  Loader,
  Paper,
} from "@mantine/core";
import {
  IconSearch,
  IconAlertCircle,
  IconMoodEmpty,
} from "@tabler/icons-react";
import BookCard from "../../components/bookCard/BookCard";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () => API.get("/books/books").then((res) => res.data),
  });

  const filteredBooks = books?.filter((book) =>
    book?.name?.trim("").toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <Container className="mt-[100px] mb-[100px]">
        <Center>
          <Loader size="xl" variant="dots" />
          <Text mt="lg" size="xl" color="dimmed"></Text>
        </Center>
      </Container>
    );
  }

  function handleDetail(id) {
    navigate(`/bookDetail/${id}`);
  }
  if (isError) {
    return (
      <Container className="mt-[100px] mb-[100px]">
        <Center>
          <IconAlertCircle size={48} color={theme.colors.red[7]} />
          <Title order={3} color="red" mt="md">
            Ma'lumotlarni yuklashda xatolik yuz berdi.
          </Title>
          <Text color="dimmed" mt="xs">
            Serverga ulanishni tekshiring va sahifani yangilab ko'ring.
          </Text>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl" className="mt-[80px] mb-[100px]">
      <Paper radius="lg" p="xl">
        <div className="mb-10 text-center">
          <Title order={1} className="mb-2" style={{ fontSize: "2.5rem" }}>
            📚 Kitoblar Katalogi
          </Title>
          <Text color="dimmed" size="lg">
            Kutubxonamizdagi barcha kitoblarni qidirish va koʻrish uchun
            foydalaning.
          </Text>
        </div>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Kitob nomi, muallifi yoki janrini qidirish..."
          icon={<IconSearch size={20} />}
          size="xl"
          radius="md"
          variant="filled"
          styles={(theme) => ({
            input: {
              transition: "box-shadow 0.2s ease, border-color 0.2s ease",
              "&:focus-within": {
                borderColor: theme.colors.blue[6],
                boxShadow: `0 0 0 2px `,
              },
            },
          })}
          className="mb-12"
        />

        <div className="mt-[20px]">
          {filteredBooks?.length === 0 && (
            <Center style={{ height: 250, flexDirection: "column" }}>
              <IconMoodEmpty size={60} />
              <Text size="xl" weight={600} mt="md">
                Afsuski,{" "}
                <span className="text-blue-900 font-bold">"{search}"</span>{" "}
                boʻyicha hech qanday kitob topilmadi.
              </Text>
              <Text color="dimmed" mt="xs">
                Boshqa qidiruv soʻzlar bilan urinib koʻring.
              </Text>
            </Center>
          )}
        </div>

        {filteredBooks && filteredBooks.length > 0 && (
          <SimpleGrid
            cols={4}
            spacing="xl"
            breakpoints={[
              { maxWidth: "lg", cols: 3, spacing: "lg" },
              { maxWidth: "md", cols: 2, spacing: "md" },
              { maxWidth: "sm", cols: 1, spacing: "md" },
            ]}
          >
            {filteredBooks.map((book) => (
              <div key={book.id}>
                <div onClick={() => handleDetail(book.id)}>
                  <BookCard book={book} />
                </div>
              </div>
            ))}
          </SimpleGrid>
        )}
      </Paper>
    </Container>
  );
};

export default Book;
