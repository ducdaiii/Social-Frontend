import { FiSearch, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const TopBar = ({ search, setSearch, onAddPost }) => {
  return (
    <motion.div
      className="flex items-center gap-4 backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center flex-grow bg-white/60 rounded-xl px-4 py-2 shadow-inner">
        <FiSearch className="text-gray-500 text-xl mr-3" />
        <input
          type="text"
          placeholder="Search projects, people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
        />
      </div>

      <motion.button
        onClick={onAddPost}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
      >
        <FiPlus className="text-lg" />
        <span className="font-semibold">New</span>
      </motion.button>
    </motion.div>
  );
};

export default TopBar;