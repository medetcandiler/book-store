import { useState, useEffect } from "react";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import ConfirmationModal from "../components/ConfirmationModal";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [deletedBookId, setDeletedBookId] = useState(null);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5555/books/");
      const data = await res.json();
      setBooks(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOpenModal = (id) => {
    setDeletedBookId(id);
    setShowModel(true);
  };
  const handleCloseModel = () => {
    setShowModel(false);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5555/books/${deletedBookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (result) {
        setBooks((prev) => prev.filter((book) => book._id !== deletedBookId));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setShowModel(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">My Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="h-10">
              <th className="borderRow">Book Number</th>
              <th className="borderRow">Title of The Book</th>
              <th className="borderRow max-md:hidden">Author of The Book</th>
              <th className="borderRow max-md:hidden">Publish Year</th>
              <th className="borderRow">Operations</th>
            </tr>
          </thead>
          <tbody className="">
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="borderRow">{index + 1}</td>
                <td className="borderRow">{book.title}</td>
                <td className="borderRow max-md:hidden">{book.author}</td>
                <td className="borderRow max-md:hidden">{book.publishYear}</td>
                <td className="borderRow">
                  <div className="flex justify-center space-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle fill="green" size={20} />
                    </Link>
                    <Link to={`/books/update/${book._id}`}>
                      <AiOutlineEdit fill="blue" size={20} />
                    </Link>
                    <button onClick={() => handleOpenModal(book._id)}>
                      <MdOutlineDelete fill="red" size={20} />
                    </button>
                    <ConfirmationModal
                      showModel={showModel}
                      handleDelete={handleDelete}
                      handleCloseModel={handleCloseModel}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
