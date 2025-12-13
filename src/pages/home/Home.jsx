import { Container, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Users, BookOpenText } from "lucide-react";
import { API } from "../../api/api";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import BookCard from "../../components/bookCard/BookCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HEADER_HEIGHT = 100;

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const backgroundImage =
    "https://ezma-client.vercel.app/assets/home-bg-aYS3sMx9.svg";

  const paddingTop = `${HEADER_HEIGHT}px`;
  const PRIMARY_COLOR_HEX = "#ffc107";

  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: () => API.get("/books/books").then((res) => res.data),
  });

  const availableBooks = books || [];

  return (
    <>
      <section
        className="min-h-screen relative overflow-hidden"
        style={{ paddingTop: paddingTop }}
      >
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-contain object-bottom absolute bottom-0 "
          />
        </div>

        <Container size="xl" className="w-full relative z-10">
          <div className="flex flex-col justify-center items-center text-center pt-[150px] pb-20">
            <h1
              className={`text-5xl font-extrabold mb-4 max-w-4xl tracking-tight text-gray-800 dark:text-gray-100`}
              style={{ color: PRIMARY_COLOR_HEX }}
            >
              {t("searchBoksHome")}
            </h1>

            <div className="flex w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder={t("searchBoksHome")}
                className="flex-grow p-5 text-lg border-none focus:ring-0 focus:border-0 placeholder-gray-500 rounded-l-xl outline-none dark:bg-gray-700 dark:text-white"
              />
              <button
                className="px-8 text-xl font-bold text-gray-900 transition-colors duration-300 flex items-center justify-center hover:opacity-90 rounded-r-xl cursor-pointer"
                style={{ backgroundColor: PRIMARY_COLOR_HEX }}
              >
                <Users className="w-6 h-6 mr-3" /> {t("search")}
              </button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 ">
        <Container size="xl">
          <Flex
            direction="column"
            align="center"
            justify="center"
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 ">
              <BookOpenText className="inline w-7 h-7 mr-2 text-amber-500" />{" "}
              {t("mostBooks")}
            </h1>
            <div className="mt-4 w-44 h-1 bg-amber-500 mx-auto rounded-full" />
          </Flex>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 20 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="pb-10"
          >
            {availableBooks?.slice(0, 10).map((book, index) => (
              <SwiperSlide key={book.id}>
                <div>
                  <BookCard book={book} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>
    </>
  );
};

export default Home;
