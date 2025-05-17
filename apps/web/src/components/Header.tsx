import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header>
      <nav className="flex p-2 gap-2 bg-accent-foreground text-accent">
        <Link to="/">
          <Button variant="link" className="text-inherit">
            Home
          </Button>
        </Link>
        <Link to="/text-stream">
          <Button variant="link" className="text-inherit">
            Text Stream
          </Button>
        </Link>
        <Link to="/sse">
          <Button variant="link" className="text-inherit">
            SSE
          </Button>
        </Link>
      </nav>
    </header>
  );
}
