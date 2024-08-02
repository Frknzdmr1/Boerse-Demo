const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-blue-500 rounded-full animate-spin h-16 w-16"></div>
      <span className="ml-3 text-blue-500 text-lg">Loading...</span>
    </div>
  );
};

export default Loading;
