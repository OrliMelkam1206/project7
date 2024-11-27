import { Link } from "react-router-dom";

export default function NavBar() {
  function handleDeleteLS() {
    localStorage.clear();
  }
  return (
    <nav className="navbar">
      <Link to="info">
        <button>Info</button>
      </Link>
      <Link to="todos">
        <button>Todos</button>
      </Link>
      <Link to="posts">
        <button>Posts</button>
      </Link>
      <Link to="albums">
        <button>Albums</button>
      </Link>
      <Link to="/" replace>
        <button onClick={handleDeleteLS}>Logout</button>
      </Link>
    </nav>
  );
}