import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header>
      <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
      </nav>
    </header>
  );
}
