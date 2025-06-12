import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }, refresh] = useLoginMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  const isFormValid = isEmailValid && formData.password.length > 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateRandomState = (length = 16) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleGoogleLogin = () => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GOOGLE_REDIRECT_URI
    }&response_type=code&scope=email profile`;
    window.location.href = googleAuthURL;
  };

  const handleGithubLogin = () => {
    const state = generateRandomState();
    localStorage.setItem("github_oauth_state", state);
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_GITHUB_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GITHUB_REDIRECT_URI
    }&scope=read:user%20user:email&state=${state}`;

    window.location.href = githubAuthURL;
    // console.log("OAuth URL:", import.meta.env.VITE_GITHUB_CLIENT_ID);
    // console.log("OAuth URL:", import.meta.env.VITE_GITHUB_REDIRECT_URI);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData).unwrap();
      setFormData({ email: "", password: "" });
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Login Failed:", err?.data?.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
      {/* Nút quay lại & Đăng nhập */}
      <div className="absolute left-0 right-0 top-4 flex justify-between px-8 w-full">
        <motion.button
          whileHover={{ scale: 1.2, rotate: -15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/")}
          className="p-4 bg-blue-400 text-white rounded-full shadow-xl"
        >
          <img src="/home.png" alt="backTOback" className="w-8 h-8" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/register")}
          className="p-4 bg-green-600 text-white rounded-full shadow-xl"
        >
          <img src="/refresh.png" alt="backTOback" className="w-8 h-8" />
        </motion.button>
      </div>

      {/* Form đăng nhập */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#001f3f] to-[#2c003e] p-8 rounded-xl shadow-xl w-110 transform hover:scale-105 transition-transform duration-300 border border-[#00E0FF] relative overflow-hidden"
      >
        <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-400 text-transparent bg-clip-text">
          WELCOME BACK!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleGithubLogin}
            className="w-full p-3 flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-lg shadow-lg transition-all duration-300"
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo-700x394.png"
              alt="GitHub"
              className="w-10 h-5"
            />
            Login with GitHub
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleGoogleLogin}
            className="w-full p-3 flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-200"
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
              alt="Google"
              className="w-10 h-5"
            />
            Login with Google
          </motion.button>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-5 p-3 bg-transparent border border-[#00E0FF] rounded-lg text-white focus:ring-2 focus:ring-[#00E0FF] outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-[#00E0FF] rounded-lg text-white focus:ring-2 focus:ring-[#00E0FF] outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!isFormValid}
            className={`w-full p-3 font-semibold rounded-lg shadow-lg transition-all duration-300 ${
              isFormValid
                ? "bg-[#00E0FF] text-gray-900 hover:bg-[#00B2CC] hover:shadow-cyan-500/50"
                : "bg-gray-500 text-white cursor-not-allowed"
            }`}
          >
            {isLoading ? "Login..." : "LOGIN"}
          </motion.button>
        </form>

        {/* Hiển thị lỗi */}
        {error && (
          <p className="text-red-400 text-center mt-2">
            {typeof error.data?.message === "string"
              ? error.data.message
              : typeof error.data?.message === "object"
              ? Object.values(error.data.message)[0]
              : "Đã xảy ra lỗi!"}
          </p>
        )}

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#00E0FF] hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
