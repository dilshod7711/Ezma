import {
  Flex,
  Text,
  Badge,
  Popover,
  TextInput,
  Button,
  Modal,
  FocusTrap,
} from "@mantine/core";
import { Star } from "lucide-react";
import { RxDotsHorizontal } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../api/api";
import { queryClient } from "../../main";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import authStore from "../../store/authStore";

const BookCard = ({ book }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [popoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);

  const [editID, setEditId] = useState(null);
  const { isAuth } = authStore();

  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookQuantity, setBookQuantity] = useState(0);

  function handleDetail(id) {
    navigate(`/bookDetail/${id}`);
  }

  const navigate = useNavigate();
  const BASE_IMAGE_URL =
    "https://avatanplus.com/files/resources/original/5749cec7733ab154f84fbb30.png";

  const { mutate: deleteBook } = useMutation({
    mutationFn: (id) => API.delete(`/books/book/${id}/`),
  });

  function handleDeleteBook(id) {
    closePopover();
    const isConfirm = confirm("Kitobni o'chirmoqchimisiz?");

    if (!isConfirm) return;

    deleteBook(id, {
      onSuccess: () => {
        notifications.show({
          message: "Kitob o'chirildi",
        });
        queryClient.invalidateQueries({
          queryKey: ["books"],
        });
      },
      onError: () => {
        notifications.show({
          message: "O'chirishda xatolik",
          color: "red",
        });
      },
    });
  }

  const { mutate: editBook } = useMutation({
    mutationFn: ({ id, data }) => API.put(`/books/book/${id}/`, data),
  });

  function handleUpdateBook(book) {
    closePopover();
    open();

    setEditId(book.id);
    setBookName(book?.name);
    setBookAuthor(book?.author);
    setBookPublisher(book?.publisher);
    setBookQuantity(book?.quantity_in_library);
  }

  function handleSubmitUpdateBook(e) {
    e.preventDefault();

    const uptadeBook = {
      name: bookName,
      author: bookAuthor,
      publisher: bookPublisher,
      quantity_in_library: bookQuantity,
    };

    editBook(
      { id: editID, data: uptadeBook },
      {
        onSuccess: () => {
          notifications.show({
            message: "Kitob muvaffaqiyatli tahrirlandi!",
            color: "blue",
          });
          queryClient.invalidateQueries({
            queryKey: ["books"],
          });
          close();
        },
        onError: (error) => {
          console.error("Tahrirlash xatosi:", error);
          notifications.show({
            message: "Tahrirlashda xatolik yuz berdi!",
            color: "red",
          });
        },
      }
    );
  }

  return (
    <div className="p-3 rounded-sm transition-all border-1 border-gray-200 duration-300border border-gray-200  dark:hover:shadow-sm  cursor-pointer transform ">
      <div className="relative overflow-hidden rounded-lg aspect-[4/5] mb-3">
        <img
          onClick={() => handleDetail(book.id)}
          src={BASE_IMAGE_URL}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150x225?text=Rasm+yo'q";
          }}
          alt={book?.name}
          className="w-full h-full  transition-transform duration-500 hover:scale-[1.06"
        />
        <div className="flex justify-between  gap">
          <Badge
            color="indigo"
            variant="filled"
            className="absolute top-2 left-2 z-10 text-xs font-bold"
            radius="xs"
          >
            O'QILGAN
          </Badge>
        </div>
      </div>

      <div className="px-1 pb-1">
        <div className="flex justify-between items-center">
          <p className="text-gray-600 text-sm line-clamp-1">{book?.author}</p>

          {isAuth && (
            <Popover
              width={150}
              position="top"
              withArrow
              shadow="md"
              color="blue"
              opened={popoverOpened}
              onClose={closePopover}
            >
              <Popover.Target>
                <RxDotsHorizontal onClick={openPopover} />
              </Popover.Target>
              <Popover.Dropdown>
                <div className="flex flex-col gap-4">
                  <Button
                    color="red"
                    onClick={() => handleDeleteBook(book?.id)}
                  >
                    {" "}
                    <div className="flex gap-1">
                      <AiFillDelete />
                      <span> Delete</span>
                    </div>
                  </Button>
                  <Button
                    style={{ backgroundColor: "#F59E0B", color: "white" }}
                    onClick={() => handleUpdateBook(book)}
                  >
                    Edit
                  </Button>
                </div>
              </Popover.Dropdown>
            </Popover>
          )}
          {!isAuth && ""}
        </div>
        <h2 className="text-xl font-bold text-gray-700 mt-1 line-clamp-1">
          {book?.name}
        </h2>

        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-1">
          Nashriyot: {book?.publisher}
        </p>

        <Flex
          justify="space-between"
          align="center"
          className="mt-4 pt-3 border-t border-dashed border-gray-200 dark:border-gray-600"
        >
          <Flex align="center" gap={4}>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <Text
              size="sm"
              className="font-semibold text-gray-700 dark:text-gray-300"
            >
              {book?.rating || 4.5}
            </Text>
          </Flex>

          <Badge
            color={book?.quantity_in_library > 0 ? "green" : "red"}
            variant="light"
            size="sm"
            radius="md"
            className="font-bold"
          >
            {book?.quantity_in_library > 0
              ? `${book?.quantity_in_library} BOR`
              : "TUGAGAN"}
          </Badge>
        </Flex>
      </div>
      <Modal opened={opened} onClose={close} title="Kitobni tahrirlash">
        <form onSubmit={handleSubmitUpdateBook}>
          <FocusTrap.InitialFocus />
          <TextInput
            label="Kitob nomi"
            placeholder="Kitob nomi"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <TextInput
            data-autofocus
            label="Muallif"
            placeholder="Muallif"
            mt="md"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          <TextInput
            label="Nashriyot"
            placeholder="Nashriyot"
            mt="md"
            value={bookPublisher}
            onChange={(e) => setBookPublisher(e.target.value)}
          />
          <TextInput
            type="number"
            label="Kitoblar soni"
            placeholder="Kitoblar soni"
            mt="md"
            value={bookQuantity}
            onChange={(e) => setBookQuantity(e.target.value)}
          />
          <div className="mt-3 ml-auto flex gap-2 w-full justify-end items-end">
            <Button variant="outline" onClick={close}>
              Bekor qilish
            </Button>
            <Button type="submit">O'zgartirish</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BookCard;
