import logo from "../assets/logo.svg";

const Logo = ({ className = "h-16 w-16" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img src={logo} alt="Logo" className="h-12 w-full object-contain" />
    </div>
  );
};

export default Logo;