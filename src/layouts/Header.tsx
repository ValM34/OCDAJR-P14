import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="main-layout-header">
      <b className="main-layout-title">HRnet</b>
      <div className="main-layout-links">
        <Link to="/">Home</Link>
        <Link to="/employee-list">Employee List</Link>
      </div>
    </div>
  );
}

export default Header;
