import {
  Container,
  Input,
  Title,
  Text,
  SimpleGrid,
  Center,
  Loader,
  Paper,
  Flex,
} from "@mantine/core";
import {
  IconSearch,
  IconAlertCircle,
  IconMoodEmpty,
} from "@tabler/icons-react";
import { Modal, Button, TextInput, FocusTrap } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineBook } from "react-icons/ai";
import { FaBookMedical } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { Menu } from "@mantine/core";
import BookCard from "../../components/bookCard/BookCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import { queryClient } from "../../main";
import authStore from "../../store/authStore";

const Book = () => {
  const [search, setSearch] = useState("");
  const { isAuth } = authStore();

  const [opened, { open, close }] = useDisclosure(false);
  const kitobRef = useRef();
  const muallifRef = useRef();
  const nashriyotRef = useRef();
  const soniRef = useRef();
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () => API.get("/books/books").then((res) => res.data),
  });

  const { mutate: createBook } = useMutation({
    mutationKey: ["createBook"],
    mutationFn: (body) => API.post("/books/books/", body),
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

  function handleSubmitBookCreate(e) {
    e.preventDefault();

    const newCreateBook = {
      name: kitobRef.current.value,
      author: muallifRef.current.value,
      publisher: nashriyotRef.current.value,
      quantity_in_library: soniRef.current.value,
    };
    createBook(newCreateBook, {
      onSuccess: () => {
        notifications.show({
          message: "Kitob qo'shildi ",
        });
        close();
        queryClient.invalidateQueries({
          queryKey: ["books"],
        });
      },
      onError: () => {
        notifications.show({
          message: "Kitob qo'shishda xatolik",
          color: "red",
        });
      },
    });
  }

  return (
    <>
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
                  <div>
                    <BookCard book={book} />
                  </div>
                </div>
              ))}
            </SimpleGrid>
          )}
        </Paper>
        <div>
          <Modal opened={opened} onClose={close} title="Bitta kitob qo'shish">
            <form onSubmit={handleSubmitBookCreate}>
              <FocusTrap.InitialFocus />
              <TextInput
                ref={kitobRef}
                label="Kitob nomi"
                placeholder="Kitob nomi"
              />
              <TextInput
                ref={muallifRef}
                data-autofocus
                label="Muallif"
                placeholder="Muallif"
                mt="md"
              />
              <TextInput
                ref={nashriyotRef}
                label="Nashriyot"
                placeholder="Nashriyot"
                mt="md"
              />
              <TextInput
                ref={soniRef}
                type="number"
                label="Kitoblar soni"
                placeholder="Kitoblar soni"
                mt="md"
              />
              <div className="mt-3 ml-[185px] flex gap-2 w-full">
                <Button variant="outline" onClick={close}>
                  Bekor qilish
                </Button>
                <Button type="submit">Qo'shish</Button>
              </div>
            </form>
          </Modal>
        </div>
      </Container>
      {isAuth && (
        <div className="fixed bottom-8 right-8">
          <Menu width={250} shadow="md">
            <Menu.Target>
              <Button>
                <LuPlus />
                <span className="ml-1"> Kitob qo'shish</span>
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>
                {" "}
                <Flex onClick={open} align="center" gap="xs">
                  <AiOutlineBook />
                  <span> Bitta kitob qo'shish</span>
                </Flex>
              </Menu.Item>
              <Menu.Item>
                {" "}
                <Flex align="center" gap="xs">
                  <FaBookMedical />
                  Bir nechta kitob qo'shish
                </Flex>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
      {!isAuth && ""}
    </>
  );
};

export default Book;
