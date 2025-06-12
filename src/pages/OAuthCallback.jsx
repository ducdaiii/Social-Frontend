import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGoogleCallbackQuery } from "../api/authApi";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  const { data, error } = useGoogleCallbackQuery(code, { skip: !code });

  useEffect(() => {
    if (data) {
      navigate("/", { replace: true });
      window.location.reload();
    } else if (error) {
      console.error("Google login failed:", error);
      navigate("/login");
    }
  }, [data, error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <p className="text-3xl font-extrabold text-white drop-shadow-[2px_4px_0px_rgba(0,0,0,0.4)]">
        Logging in with Google...
      </p>
    </div>
  );
};

export default OAuthCallback;
