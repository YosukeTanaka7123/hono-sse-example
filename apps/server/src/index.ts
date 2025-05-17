import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { stream, streamSSE, streamText } from "hono/streaming";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/text-stream", (c) => {
  return streamText(c, async (stream) => {
    let aborted = false;
    stream.onAbort(() => {
      console.log("Aborted Stream!");
      aborted = true;
    });

    for (let i = 0; i < 3; i++) {
      console.log("Sending text");
      // Write a text without a new line.
      await stream.write("Hello");
      // Wait 1 second.
      await stream.sleep(1000);
      // Write a text with a new line ('\n').
      await stream.writeln("Hono!");
      // Wait 1 second.
      await stream.sleep(1000);

      if (aborted) {
        break;
      }
    }
  });
});

let id = 0;

app.get("/sse", async (c) => {
  return streamSSE(c, async (stream) => {
    // Retry
    const lastEventId = c.req.header("Last-Event-ID");
    if (lastEventId) {
      console.log("Last-Event-ID", lastEventId);
      id = Number(lastEventId) + 1;
    } else {
      id = 0;
    }

    // onAbort is called when the client closes the connection.
    let aborted = false;
    stream.onAbort(() => {
      console.log("Aborted SSE!");
      aborted = true;
    });

    while (true) {
      id++;
      console.log("Sending SSE", id);
      await stream.writeSSE({
        id: String(id),
        event: "custom",
        data: `It is ${new Date().toISOString()}`,
        retry: 3000,
      });

      // Wait 1 second.
      await stream.sleep(1000);

      // 5の倍数のときはエラーとする
      if (id % 5 === 0) {
        id = 0;
        throw new Error("SSE Error occurred");
      }

      // Abort the stream if the client closes the connection.
      if (aborted) {
        break;
      }
    }
  });
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
