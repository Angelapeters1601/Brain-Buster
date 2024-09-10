import { FaUserAlt } from "react-icons/fa";

function Header() {
  return (
    <div className="header">
      <div className="header-subtitle">
        <h1>👋 Hi Brainiac,</h1>
        <FaUserAlt className="user-icon" />
      </div>
      <div className="header-title">
        <h1>Welcome to Brain-Buster Quiz!</h1>
      </div>
    </div>
  );
}

export default Header;
