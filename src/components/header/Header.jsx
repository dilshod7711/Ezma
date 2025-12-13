import { Button, Container, Flex, Select } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import authStore from "../../store/authStore";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import { useEffect } from "react";

export const HEADER_HEIGHT = 80;

const Header = () => {
  const { t, i18n } = useTranslation();
  const { isAuth } = authStore();
  const { language, setLanguage } = authStore();

  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }
  function navigateProfile() {
    navigate("/profile");
  }
  const logoUrl =
    "https://ezma-client.vercel.app/assets/ezma-light-D6Z9QF3F.svg";

  function loginPage() {
    navigate("/login");
  }

  const handleChangeLanguage = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
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
                {t("home")}
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
                {t("libraries")}
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
                {t("books")}
              </NavLink>
            </Flex>
          </Flex>

          <Flex
            gap={20}
            align="center"
            className="animate-slideInRight"
            style={{ animationDelay: "0.2s" }}
          >
            <select
              value={language}
              onChange={handleChangeLanguage}
              className="w-[80px] border border-gray-300 px-2 py-1 rounded-[4px]"
            >
              <option value="uz">UZB</option>
              <option value="ru">RUS</option>
              <option value="en">ENG</option>
            </select>
            {!isAuth && (
              <Button
                onClick={loginPage}
                variant="filled"
                color="indigo"
                className="bg-[#00aeff] hover:bg-[#0095d6] text-white font-semibold"
              >
                {t("kutubxonachi")}
              </Button>
            )}
            {isAuth && (
              <div onClick={navigateProfile}>
                <img
                  className="w-10 h-10 cursor-pointer"
                  src="https://ezma-client.vercel.app/assets/user-D__q57DX.png"
                  alt=""
                />
              </div>
            )}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
