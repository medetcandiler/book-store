const ConfirmationModal = ({ showModel, handleDelete, handleCloseModel }) => {
  return (
    <div>
      {showModel && (
        <div className=" w-screen h-screen fixed top-0 left-0 grid place-content-center z-50 bg-black bg-opacity-10 text-center ">
          <div className="bg-white p-7 -mt-6 sm:p-8 md:p-10 rounded-xl shadow ">
            <p className="my-3 text-slate-700 text-md">
              Are you sure you want to delete?
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button onClick={() => handleDelete()} className="btn">
                Yes
              </button>
              <button
                onClick={() => handleCloseModel()}
                className="btn bg-red-600 hover:bg-red-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
