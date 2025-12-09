import {
  Container,
  Card,
  Text,
  Group,
  Badge,
  Tabs,
  Avatar,
  ActionIcon,
  Stack,
  Divider,
  TextInput,
  Switch,
  Grid,
  Anchor,
} from "@mantine/core";
import {
  IconPhone,
  IconMapPin,
  IconBook,
  IconShare2,
  IconMap,
  IconPencil,
  IconCheck,
  IconX,
  IconBrandTelegram,
  IconBrandFacebook,
  IconBrandInstagram,
  IconLogout,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import authStore from "../../store/authStore";
import BookCard from "../../components/bookCard/BookCard";
import { Link } from "react-router-dom";

const Profile = () => {
  const { logout } = authStore();
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: profiles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/profile/").then((res) => res.data),
  });
  const { data: myBooks } = useQuery({
    queryKey: ["myBooks"],
    queryFn: () => API.get("/libraries/library/books").then((res) => res.data),
  });
  console.log(profiles);

  if (isLoading)
    return (
      <Container className="mt-[100px]">
        <Text size="xl" c="blue">
          Profil yuklanmoqda...
        </Text>
      </Container>
    );
  if (isError)
    return (
      <Container className="mt-[100px]">
        <Text size="xl" c="red">
          Xatolik yuz berdi.
        </Text>
      </Container>
    );
  if (!profiles)
    return (
      <Container className="mt-[100px]">
        <Text size="xl">Profil ma'lumoti topilmadi.</Text>
      </Container>
    );

  const user = profiles.user || {};

  function handleLogOut() {
    openDeleteModal();
  }

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Kitobni o'chirmoqchimisiz",
      centered: true,
      labels: { confirm: "Ha", cancel: "Yo'q" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => logout(),
    });

  const MainProfileBlock = () => (
    <Card padding="xl" radius="md" withBorder className="mb-6">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group wrap="nowrap" gap="md">
          <Avatar size={90} radius="md" src={user.avatar_url}>
            {user.name ? user.name.charAt(0).toUpperCase() : "?"}
          </Avatar>

          <Stack gap={4}>
            <Text size="xl" fw={700}>
              {user.name || "Noma'lum Ism"}
            </Text>

            <Group gap={6}>
              <IconPhone
                size={14}
                style={{ color: "var(--mantine-color-dimmed)" }}
              />
              <Text size="sm" c="dimmed" fw={500}>
                {user.phone || "Kiritilmagan"}
              </Text>
            </Group>

            <Badge
              color={profiles.can_rent_books ? "blue" : "red"}
              variant="light"
              radius="sm"
              leftSection={
                profiles.can_rent_books ? (
                  <IconCheck size={12} />
                ) : (
                  <IconX size={12} />
                )
              }
              className="mt-1"
            >
              {profiles.can_rent_books
                ? "Kitob berishga ruxsat"
                : "Kitob berish cheklangan"}
            </Badge>

            <Group gap={6} className="mt-1">
              <IconMapPin
                size={14}
                style={{ color: "var(--mantine-color-dimmed)" }}
              />
              <Text size="sm" c="dimmed">
                {profiles.address || "Manzil kiritilmagan"}
              </Text>
            </Group>
          </Stack>
        </Group>

        <div className="flex items-center justify-center">
          <ActionIcon
            variant="subtle"
            size="lg"
            aria-label="Profilni tahrirlash"
          >
            <IconPencil
              variant="default"
              onClick={open}
              style={{ width: 20, height: 20 }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            size="lg"
            aria-label="Profilni tahrirlash"
          >
            <IconLogout
              variant="default"
              onClick={handleLogOut}
              style={{ width: 20, height: 20 }}
              stroke={1.5}
            />
          </ActionIcon>
        </div>
      </Group>
    </Card>
  );

  return (
    <Container className="mt-[60px] md:mt-[100px] mb-[20px]">
      <MainProfileBlock />

      <Card padding="0" radius="md" withBorder>
        <Tabs defaultValue="kitoblarim" keepMounted={false}>
          <Tabs.List>
            <Tabs.Tab value="kitoblarim" leftSection={<IconBook size={18} />}>
              Kitoblarim
            </Tabs.Tab>
            <Tabs.Tab
              value="tarmoqlarim"
              leftSection={<IconShare2 size={18} />}
            >
              Tarmoqlarim
            </Tabs.Tab>
            <Tabs.Tab value="xarita" leftSection={<IconMap size={18} />}>
              Xarita
            </Tabs.Tab>
          </Tabs.List>
          <Divider my="xs" />{" "}
          <div className="p-4">
            <Tabs.Panel value="kitoblarim">
              <Grid columns={4}>
                {myBooks?.map((book) => (
                  <Grid.Col key={book.id} span={1}>
                    <BookCard book={book} />
                  </Grid.Col>
                ))}
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="tarmoqlarim">
              <Stack gap="sm">
                <div className="grid grid-cols-8">
                  <Group>
                    <IconBrandInstagram size={20} color="#E4405F" />
                    <Anchor
                      href={profiles.social_media?.instagram}
                      target="_blank"
                      underline="hover"
                    >
                      Instagram
                    </Anchor>
                  </Group>

                  <Group>
                    <IconBrandFacebook size={20} color="#1877F2" />
                    <Anchor
                      href={profiles.social_media?.facebook}
                      target="_blank"
                      underline="hover"
                    >
                      Facebook
                    </Anchor>
                  </Group>

                  <Group>
                    <IconBrandTelegram size={20} color="#0088CC" />
                    <Anchor
                      href={profiles.social_media?.telegram}
                      target="_blank"
                      underline="hover"
                    >
                      Telegram
                    </Anchor>
                  </Group>
                </div>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="xarita">
              <Text size="sm" c="dimmed">
                Xarita ma'lumotlari mavjud emas.
              </Text>
            </Tabs.Panel>
          </div>
        </Tabs>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text size="lg" fw={600}>
            Profilni tahrirlash
          </Text>
        }
        centered
        padding="xl"
      >
        <Stack gap="lg">
          <TextInput
            required
            label="* Manzil"
            placeholder="Tashkent"
            defaultValue="Tashkent"
            leftSection={<IconMapPin size={18} />}
          />

          <Switch
            label="Kitob ijarasi"
            description="Kitob ijarasi mavjud emas"
          />

          <Text size="sm" fw={500} className="mt-2">
            Ijtimoiy tarmoqlar
          </Text>

          <TextInput
            placeholder="https://instagram.com/username"
            defaultValue="https://instagram.com/scx"
            leftSection={<IconBrandInstagram size={18} color="#E4405F" />}
          />

          <TextInput
            placeholder="https://facebook.com/page"
            defaultValue="https://facebook.com/sac"
            leftSection={<IconBrandFacebook size={18} color="#1877F2" />}
          />

          <TextInput
            placeholder="https://t.me/username"
            defaultValue="https://t.me/aw"
            leftSection={<IconBrandTelegram size={18} color="#0088CC" />}
          />

          <Button variant="filled" color="blue" fullWidth>
            Xaritada joylashuvni tanlash
          </Button>
        </Stack>

        <Group justify="flex-end" className="mt-8">
          <Button variant="default" onClick={close}>
            Bekor qilish
          </Button>
          <Button color="blue">Saqlash</Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default Profile;
