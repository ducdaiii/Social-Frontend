import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();
      console.log("Register Success:", response);
      navigate("/login");
    } catch (err) {
      console.error("Register Failed:", err?.data?.message);
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
          onClick={() => navigate("/login")}
          className="p-4 bg-green-600 text-white rounded-full shadow-xl"
        >
          <img src="/refresh.png" alt="backTOback" className="w-8 h-8" />
        </motion.button>
      </div>

      {/* Form đăng ký */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#001f3f] to-[#2c003e] p-8 rounded-xl shadow-xl w-110 transform hover:scale-105 transition-transform duration-300 border border-[#00E0FF] relative overflow-hidden"
      >
        <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-400 text-transparent bg-clip-text">
          WELCOME!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-[#00E0FF] rounded-lg text-white focus:ring-2 focus:ring-[#00E0FF] outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-[#00E0FF] rounded-lg text-white focus:ring-2 focus:ring-[#00E0FF] outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full p-3 bg-[#00E0FF] text-gray-900 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-[#00B2CC] hover:shadow-cyan-500/50"
          >
            {isLoading ? "Registering..." : "REGISTER"}
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
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
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

export default Register;