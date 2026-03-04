import express from "express";

import { handleClassic } from "./server/classic.tsx";
import { handleStream } from "./server/stream.tsx";
import { handleSuspense } from "./server/suspense.tsx";

const app = express();
const port = process.env.PORT || 3000;

app.get("/classic/:id", handleClassic);
app.get("/stream/:id", handleStream);
app.get("/suspense/:id", handleSuspense);

app.use(express.static("out"));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
