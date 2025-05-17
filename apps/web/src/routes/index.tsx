import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="container mx-auto h-full flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Hono Stream Example</h2>
    </div>
  );
}
