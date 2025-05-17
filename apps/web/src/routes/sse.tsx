import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { useSSE } from "~/hooks";

export const Route = createFileRoute("/sse")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isConnected, data, error, connect, disconnect } = useSSE({
    url: `${import.meta.env.VITE_API_URL}/sse`,
  });

  return (
    <div className="container mx-auto h-full flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Server-Sent Events</h2>
      <div className="flex gap-4">
        <Button disabled={isConnected} onClick={connect}>
          start SSE
        </Button>
        <Button disabled={!isConnected} onClick={disconnect}>
          close SSE
        </Button>
      </div>

      {error && <p className="text-red-500">{error.name}</p>}

      <div className="h-0 grow border rounded-md text-accent-foreground bg-accent p-4 overflow-auto">
        <p className="whitespace-pre-wrap">
          {data.reduce((prev, curr) => `${prev}${curr}\n`, "")}
        </p>
      </div>
    </div>
  );
}
