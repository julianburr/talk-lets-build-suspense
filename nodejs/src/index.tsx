import express from "express";

import { handleClassic } from "./server/classic.tsx";
import { handleStream } from "./server/stream.tsx";
import { handleSuspense } from "./server/suspense.tsx";

const app = express();
const port = process.env.PORT || 3000;

app.get("/classic", (req, res) => handleClassic(req, res));
app.get("/stream", handleStream);
app.get("/suspense", handleSuspense);

app.use(express.static("out"));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
