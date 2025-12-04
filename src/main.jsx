import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import App from "./App.jsx";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  components: {
    Container: {
      defaultProps: {
        size: 1320,
      },
    },
  },
});

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <App />
        <Notifications position="top-right" />
      </MantineProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
