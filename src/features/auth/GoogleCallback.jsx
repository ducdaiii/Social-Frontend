import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGoogleCallbackQuery } from "../../api/authApi";


const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  // Gọi API GET nếu có code
  const { data, error } = useGoogleCallbackQuery(code, { skip: !code });

  useEffect(() => {
    if (data) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
    } else if (error) {
      console.error("Google login failed:", error);
      navigate("/login");
    }
  }, [data, error, navigate]);

  return <p>Logging in with Google...</p>;
};

export default GoogleCallback;