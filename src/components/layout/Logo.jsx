import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = ({ className = "ml-5" }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate("/")}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-pointer select-none ${className}`}
    >
      {/* Full logo - chỉ hiển thị từ lg trở lên */}
      <div className="hidden lg:flex items-center justify-center relative text-3xl xl:text-4xl font-black uppercase tracking-wide text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
        <span className="text-cyan-400">Share</span>
        <span className="text-blue-600 ml-1">Work</span>
        <span className="text-white ml-1">Tech</span>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-white blur-lg opacity-20 animate-pulse"></div>
      </div>

      {/* Logo ngắn gọn (SWT) - hiển thị từ mobile đến md và cả md */}
      <div className="flex lg:hidden items-center justify-center relative text-2xl font-extrabold uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">
        <span className="text-cyan-400">S</span>
        <span className="text-blue-600 ml-1">W</span>
        <span className="text-white ml-1">T</span>

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-white blur-md opacity-25 animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export default Logo;