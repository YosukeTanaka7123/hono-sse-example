import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  return (
    <div className="container bg-amber-50 mx-auto">
      <div>
        <Button
          type="button"
          disabled={isStreaming}
          onClick={async () => {
            setText("");
            setIsStreaming(true);
            try {
              const response = await fetch("http://localhost:8000/streamText");
              const reader = response.body?.getReader();
              if (!reader) {
                return;
              }

              const decoder = new TextDecoder("utf-8");

              const proccessText = async ({
                done,
                value,
              }: Awaited<ReturnType<typeof reader.read>>) => {
                if (done) {
                  console.log("Stream finished");
                  return;
                }

                const text = decoder.decode(value);
                console.log(text);
                setText((prev) => prev + text);

                // 再起呼び出し
                return proccessText(await reader.read());
              };

              await proccessText(await reader.read());
            } finally {
              setIsStreaming(false);
            }
          }}
        >
          watch text
        </Button>
      </div>
      <p className="h-80 w-80 border whitespace-pre-wrap">{text}</p>
    </div>
  );
}
