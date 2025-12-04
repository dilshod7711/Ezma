import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Book from "./pages/books/Book";
import Libraries from "./pages/libraries/Libraries";
import NotFound from "./pages/notFound/NotFound";
import BookDetail from "./pages/bookDetail/BookDetail";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bookDetail/:id" element={<BookDetail />} />
          <Route path="/books" element={<Book />} />
          <Route path="/libraries" element={<Libraries />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
