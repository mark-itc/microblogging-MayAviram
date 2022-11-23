import "../css/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      {/* <Link to="/">Home</Link>
      <Link to="/Profile">Profile</Link> */}
      <ul className="navbar-list">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/Profile">Profile</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
