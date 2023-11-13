import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishYear: 0,
  });
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5555/books");
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, [data]);

  const updateBook = async (data) => {
    try {
      const response = await fetch("http://localhost:5555/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result, "success");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "publishYear" ? parseInt(value, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    updateBook(formData);
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
        />
        <input
          name="publishYear"
          type="number"
          value={formData.publishYear}
          onChange={handleChange}
        />
        <input type="submit" value="submit" />
      </form>
      <div>
        {data?.data?.map((book) => (
          <div key={book._id}>{book.title}</div>
        ))}
      </div>
    </>
  );
}

export default App;
