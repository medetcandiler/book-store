import { useState, useEffect } from "react";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

import Card from "../components/Card";
import Table from "../components/Table";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [type, setType] = useState("Table");

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

  const handleCloseModel = () => {
    setShowModel(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={(e) => setType(e.target.textContent)}
          className={`btn ${type === "Table" ? "bg-green-400" : ""}`}
        >
          Table
        </button>
        <button
          onClick={(e) => setType(e.target.textContent)}
          className={`btn ${type === "Card" ? "bg-green-400" : ""}`}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">My Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : type === "Table" ? (
        <Table
          books={books}
          setBooks={setBooks}
          handleCloseModel={handleCloseModel}
          showModel={showModel}
          setShowModel={setShowModel}
        />
      ) : (
        <Card
          books={books}
          setBooks={setBooks}
          handleCloseModel={handleCloseModel}
          showModel={showModel}
          setShowModel={setShowModel}
        />
      )}
    </div>
  );
};

export default Home;
