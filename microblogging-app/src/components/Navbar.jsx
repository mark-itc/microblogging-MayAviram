import "../css/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
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
