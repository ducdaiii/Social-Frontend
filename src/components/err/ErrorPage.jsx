import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const errorMessage =
    error?.statusText ||
    error?.data?.message ||  
    error?.message ||       
    "Đã xảy ra lỗi!";

  return (
    <div className="text-center m-80">
      <h1 className="text-red-500 text-xl font-bold">
        Oops! Something went wrong.
      </h1>
      <p className="mt-4 text-gray-700">{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;