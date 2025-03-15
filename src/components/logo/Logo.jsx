// import { ReactComponent as LogoLight } from '../../assets/logo.svg';
import logoLight from '../../assets/logo.svg';

const Logo = () => {

  return (
    <div>
      {/* <LogoLight className="h-20 w-20" /> */}
      <img src={logoLight} alt="Logo" className="h-10 w-10" />
    </div>
  );
};

export default Logo;