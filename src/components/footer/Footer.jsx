import React, { useEffect } from "react";
import { Container, Text, Anchor, Group } from "@mantine/core";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const quickLinks = [
  { key: "home", href: "#" },
  { key: "libraries", href: "#" },
  { key: "books", href: "#" },
  { key: "events", href: "#" },
  { key: "about", href: "#" },
];

const contactInfo = [
  {
    icon: IconPhone,
    label: "+998 90 123 45 67",
    type: "tel",
    value: "+998901234567",
  },
  {
    icon: IconMail,
    label: "info@ezma.uz",
    type: "mailto",
    value: "info@ezma.uz",
  },
];

const socialMedia = [
  { icon: IconBrandFacebook, href: "#", label: "Facebook" },
  { icon: IconBrandInstagram, href: "#", label: "Instagram" },
  { icon: IconBrandYoutube, href: "#", label: "Youtube" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 pt-16 pb-6 border-t border-gray-200">
      <Container size="xl">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Group spacing="xs" className="mb-4">
              <svg
                className="w-8 h-8 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <Text className="text-2xl font-semibold text-gray-900">Ezma</Text>
            </Group>
            <Text className="text-sm text-gray-600 max-w-xs">
              {t("brandDescription")}
            </Text>
          </div>

          <div>
            <Text className="text-lg font-semibold mb-4 text-gray-800">
              {t("quickLinks")}
            </Text>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Anchor
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition duration-150"
                  >
                    {t(link.key)}
                  </Anchor>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Text className="text-lg font-semibold mb-4 text-gray-800">
              {t("contact")}
            </Text>
            <ul className="space-y-4 text-sm">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-center">
                    <Icon
                      size={18}
                      className="text-blue-500 mr-2 flex-shrink-0"
                    />
                    <Anchor
                      href={`${item.type}:${item.value}`}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      {item.label}
                    </Anchor>
                  </li>
                );
              })}
              <li className="flex items-start">
                <IconMapPin
                  size={18}
                  className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                />
                <Text className="text-gray-600">{t("address")}</Text>
              </li>
            </ul>
          </div>

          <div>
            <Text className="text-lg font-semibold mb-4 text-gray-800">
              {t("social")}
            </Text>
            <div className="flex space-x-4">
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition duration-150"
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <Text className="mb-2 sm:mb-0">
            © {new Date().getFullYear()} EZMA. {t("rights")}
          </Text>

          <Group spacing="md">
            <Anchor href="#" className="hover:text-gray-800">
              {t("privacy")}
            </Anchor>
            <Anchor href="#" className="hover:text-gray-800">
              {t("terms")}
            </Anchor>
          </Group>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
