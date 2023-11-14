import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";

import ConfirmationModal from "./ConfirmationModal";

const Card = ({
  books,
  showModel,
  handleCloseModel,
  setShowModel,
  setBooks,
}) => {
  const [deletedBookId, setDeletedBookId] = useState(null);

  const handleOpenModal = (id) => {
    setDeletedBookId(id);
    setShowModel(true);
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
    <section className="container mx-auto px-4 flex flex-col space-y-6 md:flex-row md:flex-wrap md:gap-3 md:space-y-0">
      {books.map((book) => (
        <div
          key={book._id}
          className="border-2 border-gray-500 rounded-lg px-14 py-2 relative hover:shadow-xl"
        >
          <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
            {book.publishYear}
          </h2>
          <h4 className="my-2 pr-12 text-gray-500 truncate">{book._id}</h4>
          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.title}</h2>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.author}</h2>
          </div>
          <div className="flex justify-center space-x-10 items-center mt-4 p-4">
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
        </div>
      ))}
    </section>
  );
};

export default Card;
