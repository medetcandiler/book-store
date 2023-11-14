import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import UpdateBook from "./pages/UpdateBook";
import DeleteBook from "./pages/DeleteBook";
import CreateBook from "./pages/CreateBook";

const App = () => {
  return (
    <section>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/books/create' element={<CreateBook />} />
        <Route path="/books/details/:id" element={<Book />} />
        <Route path='/books/update/:id' element={<UpdateBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
      </Routes>
    </section>
  );
};

export default App;
