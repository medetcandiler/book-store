import PrevButton from "../components/PrevButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object({
  title: yup.string().required(),
  author: yup.string().required(),
  publishYear: yup.number().positive().integer().required(),
});

const CreateBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const createBook = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5555/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    createBook(data);
  };

  return (
    <div className="wrapper">
      <PrevButton />
      <div className="mb-20">
        <h1 className="text-3xl my-6">Create a Book</h1>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              className="appearance-none block w-full text-slate-700 border border-black rounded py-3 px-4 mb-3 leading-tight "
              placeholder="The Wreck of The Titan"
              {...register("title")}
            />
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2"
              htmlFor="author"
            >
              Author
            </label>
            <input
              id="author"
              className="appearance-none block w-full text-slate-700 border border-black rounded py-3 px-4 mb-3 leading-tight "
              placeholder="Morgan Robertson"
              {...register("author")}
            />
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2"
              htmlFor="publishYear"
            >
              Publis Year
            </label>
            <input
              id="publishYear"
              className="appearance-none block w-full text-slate-700 border border-black rounded py-3 px-4 mb-3 leading-tight "
              placeholder="1898"
              {...register("publishYear")}
            />
          </div>
          <button
            className="bg-green-600 flex items-center space-x-3 text-[#fff] px-4 py-2 rounded-lg cursor-pointer transition ease-in duration-300 hover:-translate-y-[2px] hover:bg-green-500"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>{" "}
                Adding
              </>
            ) : (
              "Add New Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
