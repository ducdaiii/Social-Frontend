import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="text-center">
      <h1 className="text-red-500 text-xl font-bold">Oops! Something went wrong.</h1>
      <p>{error?.statusText && error|| "Đã xảy ra lỗi!"}</p>
    </div>
  );
};

export default ErrorPage;