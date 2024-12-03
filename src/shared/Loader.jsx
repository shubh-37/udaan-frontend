const Loader = ({ text }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="text-center">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin mx-auto"></div>
        <p className="mt-4 text-white text-lg font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
