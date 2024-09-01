import express from "express";

import { handleClassic } from "./server/classic.ts";
import { handleStream } from "./server/stream.ts";
import { handleSuspense } from "./server/suspense.tsx";
import { handleSuspenseFixes } from "./server/suspense-fixed.tsx";

const app = express();
const port = process.env.PORT || 3000;

app.get("/classic", handleClassic);
app.get("/stream", handleStream);
app.get("/suspense", handleSuspense);
app.get("/suspense-fixed", handleSuspenseFixes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
