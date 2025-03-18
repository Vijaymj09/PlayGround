import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

serve(app);

app.get("/generate", (context) => {
  return context.json(
    {
      randomNumber: Math.random(),
    },
    200
  );
});

app.get("/current-time", (context) => {
  const date = new Date();

  return context.json(
    {
      currentTime: date.toLocaleString(),
    },
    200
  );
});

app.get("/environment", (context) => {
  const currentNodeVersion = process.version;
  const currentPlatform = process.platform;

  return context.json(
    {
      version: currentNodeVersion,
      platform: currentPlatform,
    },
    200
  );
});

app.get("/puppet", (context) => {
  const queryParameters = context.req.query();

  return context.json(
    {
      queryParameters,
    },
    200
  );
});

const numbers: number[] = [];

app.post("/numbers", async (context) => {
  const body = await context.req.json();
  const number = body.number;

  numbers.push(number);

  return context.json(
    {
      storedNumber: number,
    },
    200
  );
});

app.get("/numbers", (context) => {
  return context.json(
    {
      numbers,
    },
    200
  );
});