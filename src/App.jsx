import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Book from "./pages/books/Book";
import Libraries from "./pages/libraries/Libraries";
import NotFound from "./pages/notFound/NotFound";
import BookDetail from "./pages/bookDetail/BookDetail";
import Profile from "./pages/profile/Profile";
import PrivateRequest from "./components/privateRequest/PrivateRequest";
import LibrariesDetail from "./pages/libraries/librariesDetail/LibrariesDetail";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bookDetail/:id" element={<BookDetail />} />
          <Route path="/libDetail/:id" element={<LibrariesDetail />} />
          <Route path="/books" element={<Book />} />
          <Route path="/libraries" element={<Libraries />} />
          <Route element={<PrivateRequest />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
