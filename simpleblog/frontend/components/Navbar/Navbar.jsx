import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>Back</Link>
      <span>SimpleBlog</span>
    </nav>
  );
}
