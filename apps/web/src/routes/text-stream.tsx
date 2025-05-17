import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { useReadableStream } from "~/hooks";

export const Route = createFileRoute("/text-stream")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isStreaming, data, error, startStream, abortStream } =
    useReadableStream({
      input: `${import.meta.env.VITE_API_URL}/text-stream`,
    });

  return (
    <div className="container mx-auto h-full flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Text Stream</h2>
      <div className="flex gap-4">
        <Button disabled={isStreaming} onClick={startStream}>
          start stream
        </Button>
        <Button disabled={!isStreaming} onClick={abortStream}>
          abort stream
        </Button>
      </div>

      {error && <p className="text-red-500">{error.name}</p>}

      <div className="grow border rounded-md text-accent-foreground bg-accent p-4">
        <p className="whitespace-pre-wrap">{data}</p>
      </div>
    </div>
  );
}
