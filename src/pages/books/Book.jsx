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
  Modal,
  Button,
  TextInput,
  FocusTrap,
  FileInput,
  Group,
} from "@mantine/core";
import { rem } from "@mantine/core";
import {
  IconSearch,
  IconAlertCircle,
  IconMoodEmpty,
  IconUpload,
  IconFileSpreadsheet,
} from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineBook } from "react-icons/ai";
import { FaBookMedical } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";
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

  const [openedSingleModal, { open: openSingle, close: closeSingle }] =
    useDisclosure(false);
  const [openedFileModal, { open: openFile, close: closeFile }] =
    useDisclosure(false);
  const [file, setFile] = useState(null);

  const kitobRef = useRef();
  const muallifRef = useRef();
  const nashriyotRef = useRef();
  const soniRef = useRef();

  // --- QUERY VA MUTATIONLAR ---

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () => API.get("/books/books").then((res) => res.data),
  });

  const { mutate: createBook } = useMutation({
    mutationFn: (body) => API.post("/books/books/", body),
  });

  // 1-bosqich: Faylni yuklash va kitoblar ro'yxatini olish
  const { mutate: uploadExcelFile, isPending: isUploading } = useMutation({
    mutationFn: (formData) => API.post("/books/upload-excel/", formData),
  });

  const { mutate: addBooks, isPending: isAddingBooks } = useMutation({
    mutationFn: (booksList) => API.post("/books/add-books/", booksList),
  });

  const isProcessing = isUploading || isAddingBooks;

  const filteredBooks = books?.filter((book) =>
    book?.name?.trim("").toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmitBookCreate(e) {
    e.preventDefault();

    const body = {
      name: kitobRef.current.value,
      author: muallifRef.current.value,
      publisher: nashriyotRef.current.value,
      quantity_in_library: soniRef.current.value,
    };

    createBook(body, {
      onSuccess: () => {
        notifications.show({
          message: "Kitob muvaffaqiyatli qo‘shildi",
        });
        closeSingle();
        queryClient.invalidateQueries(["books"]);
      },
      onError: () => {
        notifications.show({
          message: "Xatolik yuz berdi",
          color: "red",
        });
      },
    });
  }

  const handleSubmitFileUpload = (e) => {
    e.preventDefault();

    if (!file) {
      notifications.show({
        message: "Iltimos, yuklash uchun fayl tanlang.",
        color: "yellow",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    uploadExcelFile(formData, {
      onSuccess: (res) => {
        const booksFile = res.data;

        {
          addBooks(booksFile, {
            onSuccess: () => {
              notifications.show({
                title: "Muvaffaqiyat!",
                message: ` Kitob muvaffaqiyatli qo'shildi.`,
                color: "green",
              });
              setFile(null);
              closeFile();
              queryClient.invalidateQueries(["books"]);
            },
            onError: (addError) => {
              notifications.show({
                title: "Kitoblarni qo'shishda xatolik",
                message:
                  addError.response?.data?.detail ||
                  "Ma'lumotlar formati noto'g'ri.",
                color: "red",
              });
            },
          });
        }
      },
    });
  };


  if (isLoading) {
    return (
      <Container className="mt-[100px] mb-[100px]">
        <Center>
          <Loader size="xl" variant="dots" />
        </Center>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-[100px] mb-[100px]">
        <Center style={{ flexDirection: "column" }}>
          <IconAlertCircle size={48} color="red" />
          <Title order={3} color="red" mt="md">
            Xatolik yuz berdi.
          </Title>
        </Center>
      </Container>
    );
  }


  return (
    <>
      <Container size="xl" className="mt-[80px] mb-[100px]">
        <Paper radius="lg" p="xl">
          <div className="mb-10 text-center">
            <Title order={1} style={{ fontSize: "2.5rem" }}>
              📚 Kitoblar Katalogi
            </Title>
            <Text color="dimmed" size="lg">
              Kutubxonamizdagi barcha kitoblarni qidiring.
            </Text>
          </div>

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kitob nomini qidirish..."
            icon={<IconSearch size={20} />}
            size="xl"
            variant="filled"
            className="mb-12"
          />

          {filteredBooks?.length === 0 && (
            <Center style={{ height: 250, flexDirection: "column" }}>
              <IconMoodEmpty size={60} />
              <Text size="xl" weight={600} mt="md">
                "{search}" bo‘yicha hech narsa topilmadi
              </Text>
              <Text color="dimmed">Boshqa so‘z bilan urinib ko‘ring.</Text>
            </Center>
          )}

          {filteredBooks && filteredBooks.length > 0 && (
            <SimpleGrid
              cols={4}
              mt="lg"
              spacing="xl"
              breakpoints={[
                { maxWidth: "lg", cols: 3 },
                { maxWidth: "md", cols: 2 },
                { maxWidth: "sm", cols: 1 },
              ]}
            >
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </SimpleGrid>
          )}
        </Paper>

        <Modal
          opened={openedSingleModal}
          onClose={closeSingle}
          title="Bitta kitob qo‘shish"
        >
          <form onSubmit={handleSubmitBookCreate}>
            <FocusTrap.InitialFocus />

            <TextInput
              ref={kitobRef}
              label="Kitob nomi"
              placeholder="Kitob nomi"
            />
            <TextInput
              ref={muallifRef}
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

            <Flex justify="flex-end" gap="sm" mt="lg">
              <Button variant="outline" onClick={closeSingle}>
                Bekor qilish
              </Button>
              <Button type="submit">Qo‘shish</Button>
            </Flex>
          </form>
        </Modal>

        <Modal
          opened={openedFileModal}
          onClose={closeFile}
          title={
            <Text size="lg" fw={600}>
              📚 Kutubxona Ma'lumotlarini Yuklash
            </Text>
          }
          centered
        >
          <form onSubmit={handleSubmitFileUpload}>
            <Flex direction="column" gap="xl">
              <div className="flex flex-col items-center">
                <Text size="md" fw={500}>
                  Excel faylni shu yerga tanlang
                </Text>
                <Text
                  size="sm"
                  color="dimmed"
                  style={{ textAlign: "center", marginTop: rem(4) }}
                >
                  Faqat **.xlsx** yoki **.xls** formatidagi fayllar
                  qo'llab-quvvatlanadi
                </Text>
              </div>

              <FileInput
                placeholder="Faylni tanlash uchun bosing"
                accept=".xlsx, .xls"
                leftSection={
                  <IconFileSpreadsheet style={{ width: 18, height: 18 }} />
                }
                value={file}
                onChange={setFile}
                clearable
                size="lg"
              />

              <Group justify="flex-end" mt="md">
                <Button variant="outline" onClick={closeFile}>
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  leftSection={<IconUpload style={{ width: 18, height: 18 }} />}
                  disabled={!file || isProcessing}
                  loading={isProcessing}
                >
                  {isAddingBooks ? "Kitoblar qo'shilmoqda..." : "Yuklash"}
                </Button>
              </Group>
            </Flex>
          </form>
        </Modal>
      </Container>

      {isAuth && (
        <div className="fixed bottom-8 right-8">
          <Menu width={250} shadow="md">
            <Menu.Target>
              <Button>
                <LuPlus />
                <span className="ml-1"> Kitob qo‘shish</span>
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={openSingle}>
                <Flex align="center" gap="xs">
                  <AiOutlineBook />
                  Bitta kitob qo‘shish
                </Flex>
              </Menu.Item>

              <Menu.Item>
                <Flex align="center" gap="xs">
                  <FaBookMedical />
                  Bir nechta kitob qo‘shish
                </Flex>
              </Menu.Item>

              <Menu.Item onClick={openFile}>
                <Flex align="center" gap="xs">
                  <MdOutlineFileDownload />
                  Fayl yuklash
                </Flex>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
    </>
  );
};

export default Book;
