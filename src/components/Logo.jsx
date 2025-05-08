import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Logo = ({ className = "h-16 w-16" }) => {

  const navigate = useNavigate();

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img src={logo} onClick={() => navigate("/")} alt="Logo" className="h-12 w-full object-contain" />
    </div>
  );
};

export default Logo;