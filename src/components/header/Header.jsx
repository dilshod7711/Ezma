import { Button, Container, Flex } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import LanguageSelect from "../languageSelect/LanguageSelect";

export const HEADER_HEIGHT = 80;

const Header = () => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }
  const logoUrl =
    "https://ezma-client.vercel.app/assets/ezma-light-D6Z9QF3F.svg";

  return (
    <header
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md"
      style={{ height: `${HEADER_HEIGHT}px` }}
    >
      <Container maw={1320} mx="auto" className="h-full">
        <Flex justify="space-between" align="center" className="h-full">
          <Flex align="center" gap={50}>
            <div
              className="animate-slideInLeft"
              style={{ animationDelay: "0s" }}
            >
              <img
                onClick={handleNavigate}
                className="w-[130px] cursor-pointer"
                src={logoUrl}
                alt="Ezma Logo"
              />
            </div>

            <Flex
              gap={25}
              className="animate-slideInLeft"
              style={{ animationDelay: "0.2s" }}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-Poppins text-lg transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-[#00aeff]"
                      : "text-gray-700 hover:text-[#00aeff]"
                  }`
                }
              >
                Bosh sahifa
              </NavLink>
              <NavLink
                to="/libraries"
                className={({ isActive }) =>
                  `font-Poppins text-lg transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-[#00aeff]"
                      : "text-gray-700 hover:text-[#00aeff]"
                  }`
                }
              >
                Kutubxonalar
              </NavLink>
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  `font-Poppins text-lg transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-[#00aeff]"
                      : "text-gray-700 hover:text-[#00aeff]"
                  }`
                }
              >
                Kitoblar
              </NavLink>
            </Flex>
          </Flex>

          <Flex
            gap={20}
            align="center"
            className="animate-slideInRight"
            style={{ animationDelay: "0.2s" }}
          >
            <LanguageSelect />
            <Button
              variant="filled"
              color="indigo"
              className="bg-[#00aeff] hover:bg-[#0095d6] text-white font-semibold"
            >
              Kutubxonachi bo'lish
            </Button>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
