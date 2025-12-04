import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API } from "../../api/api";
import {
  Star,
  Library,
  BookOpen,
  BookText,
  User,
  Hash,
  Clock,
} from "lucide-react";
import bookImg from "../../assets/image/book.jpg";
import { Container } from "@mantine/core";

const PLACEHOLDERS = {
  category: "Badiiy Adabiyot",
  author: "Noma'lum Muallif",
  rating: 4,
  description:
    "Bu kitob haqida hozircha batafsil ma’lumot mavjud emas. Ammo bu asar o‘quvchini chuqur fikrlashga chorlaydi va uning hayotiy tajribalariga yangi nuqtai nazarlarni olib kiradi.",
  pageCount: "Noma'lum",
  publishYear: "Noma'lum",
};

const TailwindSkeleton = ({
  heightClass,
  widthClass,
  mbClass = "mb-4",
  roundedClass = "rounded-lg",
}) => (
  <div
    className={`bg-gray-200 animate-pulse ${heightClass} ${widthClass} ${mbClass} ${roundedClass}`}
  ></div>
);

const TailwindBadge = ({ icon: Icon, text, color, variant = "solid" }) => {
  let bgColor = `bg-${color}-500`;
  let textColor = "text-white";
  let ringColor = "";

  if (variant === "light") {
    bgColor = `bg-${color}-100`;
    textColor = `text-${color}-800`;
    ringColor = `ring-1 ring-${color}-300`;
  } else if (color === "amber") {
    bgColor = "bg-amber-500";
    textColor = "text-black";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-xl ${bgColor} ${textColor} ${ringColor} ${
        variant === "light" ? "shadow-sm" : ""
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </span>
  );
};

const BookDetail = () => {
  const { id } = useParams();

  const { data: book, isLoading } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: () => API.get(`/books/book/${id}`).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <section className="pt-[150px] pb-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 shadow-xl rounded-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              <div className="col-span-1 flex justify-center">
                <TailwindSkeleton
                  heightClass="h-[450px]"
                  widthClass="w-[300px]"
                  roundedClass="rounded-2xl"
                />
              </div>

              <div className="col-span-2">
                <TailwindSkeleton heightClass="h-7" widthClass="w-2/3" />
                <TailwindSkeleton
                  heightClass="h-5"
                  widthClass="w-1/3"
                  mbClass="mb-6"
                />
                <TailwindSkeleton
                  heightClass="h-4"
                  widthClass="w-full"
                  mbClass="mb-2"
                />
                <TailwindSkeleton
                  heightClass="h-4"
                  widthClass="w-11/12"
                  mbClass="mb-2"
                />
                <TailwindSkeleton
                  heightClass="h-4"
                  widthClass="w-full"
                  mbClass="mb-8"
                />
                <div className="flex gap-4">
                  <TailwindSkeleton heightClass="h-12" widthClass="w-40" />
                  <TailwindSkeleton heightClass="h-12" widthClass="w-48" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const bookData = {
    ...book,
    category: book?.category || PLACEHOLDERS.category,
    author: book?.author || PLACEHOLDERS.author,
    rating: book?.rating || PLACEHOLDERS.rating,
    description: book?.description || PLACEHOLDERS.description,
    pageCount: book?.pageCount || PLACEHOLDERS.pageCount,
    publishYear: book?.publishYear || PLACEHOLDERS.publishYear,
  };

  return (
    <section className="pt-[150px] pb-20 relative bg-gray-50 min-h-screen">
      <div className="absolute inset-0 opacity-5 bg-dots-pattern"></div>

      <Container className=" px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white shadow-xs p-8 md:p-12 lg:p-16 rounded-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div className="col-span-1 flex flex-col items-center">
              <img
                src={bookImg}
                alt={bookData.name}
                className="w-[300px] h-[450px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02] border-4 border-amber-300/50"
              />

              <div className="border border-gray-200 p-4 rounded-md mt-8 w-[300px] text-center bg-white shadow-sm">
                <p className="text-sm font-semibold mb-1 text-gray-600">
                  O'quvchilar Reytingi
                </p>
                <div className="flex justify-center items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < bookData.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xl font-bold ml-1">
                    {bookData.rating}.0
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <p className="text-xs font-bold text-gray-500 mb-2 tracking-widest">
                KITOB DETALLARI
              </p>

              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                {bookData.name || "Noma'lum Kitob Nomi"}
              </h1>

              <div className="flex flex-wrap gap-x-3 gap-y-2 mb-8">
                <TailwindBadge
                  icon={BookText}
                  text={bookData.category}
                  color="amber"
                />
                <TailwindBadge
                  icon={User}
                  text={bookData.author}
                  color="blue"
                  variant="light"
                />
              </div>

              <div className="border-b border-gray-200 my-4"></div>

              <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex items-center gap-x-2">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-700">
                    Sahifalar soni:{" "}
                    <span className="font-semibold">{bookData.pageCount}</span>
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-700">
                    Nashr yili:{" "}
                    <span className="font-semibold">
                      {bookData.publishYear}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <Hash className="w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-700">
                    ID: <span className="font-semibold">{id}</span>
                  </p>
                </div>
              </div>

              <p className="text-lg font-bold text-gray-800 mb-2">
                Qisqacha Tavsif
              </p>
              <p className="text-gray-700 leading-relaxed mb-8 border-l-4 border-amber-400 pl-4 py-2 bg-amber-50/50 rounded-r-md">
                {bookData.description}
              </p>

              <div className="flex gap-4 mt-8">
                <button
                  className="px-6 py-3 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: "#FFC107",
                    color: "black",
                    boxShadow: "0 4px 15px rgba(255, 193, 7, 0.4)",
                  }}
                >
                  <BookOpen className="w-5 h-5" />
                  Kitobni o‘qish
                </button>

                <button className="px-6 py-3 text-lg font-semibold rounded-xl border-2 border-blue-500 text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2">
                  <Library className="w-5 h-5" />
                  Kutubxonaga qo‘shish
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BookDetail;
