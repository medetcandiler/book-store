import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PrevButton from "../components/PrevButton";
import Loader from "../components/loader";

const Book = () => {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchBook = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5555/books/${id}`);
      const data = await res.json();
      setBook(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <section className="container mx-auto px-12">
      <PrevButton />
      <h1 className="text-3xl mt-20 mb-5">Details of Book</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col space-y-6 border border-sky-700 p-10 rounded-lg">
          <div className="flex items-center space-x-3">
            <h1 className="text-slate-700 text-xl whitespace-nowrap">Id</h1>
            <span className="text-md">{book._id}</span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="text-slate-700 text-xl">Title</h1>
            <span className="text-md">{book.title}</span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="text-slate-700 text-xl">Author</h1>
            <span className="text-md">{book.author}</span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="text-slate-700 text-xl">Publish Year</h1>
            <span className="text-md">{book.publishYear}</span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="text-slate-700 text-xl">Create Time</h1>
            <span className="text-md">
              {new Date(book.createdAt).toString()}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="text-slate-700 text-xl">Last Update Time</h1>
            <span className="text-md">
              {new Date(book.updatedAt).toString()}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Book;
