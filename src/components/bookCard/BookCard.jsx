import React from "react";
import { Flex, Text, Badge } from "@mantine/core";
import { Star } from "lucide-react";
const BookCard = ({ book }) => {
  const BASE_IMAGE_URL =
    "data:image/jpeg;base64,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";
  return (
    <div className="p-3 rounded-xl shadow-lg transition-all duration-300 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow-2xl dark:hover:shadow-xl dark:hover:shadow-gray-700/50 cursor-pointer transform ">
      <div className="relative overflow-hidden rounded-lg aspect-[4/5] mb-3">
        <img
          src={BASE_IMAGE_URL}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150x225?text=Rasm+yo'q";
          }}
          alt={book?.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.06"
        />

        <Badge
          color="indigo"
          variant="filled"
          className="absolute top-2 left-2 z-10 text-xs font-bold"
          radius="xs"
        >
          O'QILGAN
        </Badge>
      </div>

      <div className="px-1 pb-1">
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-1">
          {book?.author}
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1 line-clamp-1">
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
    </div>
  );
};

export default BookCard;
