import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const errorMessage =
    error?.statusText ||
    error?.data?.message ||  
    error?.message ||       
    "!!!";

  return (
    <div className="text-center m-80">
      <h1 className="text-red-500 text-xl font-bold">
        Oops! Something went wrong.
      </h1>
      <p className="mt-4 text-white">{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;