import { Request, Response } from "express";
import { renderToString } from "react-dom/server";

import { Header } from "../components/Header.tsx";
import { Title } from "../components/Title.tsx";
import { Details } from "../components/Details.tsx";
import { Similar } from "../components/Similar.tsx";

export async function handleStream(req: Request, res: Response) {
  const id = req.query.id as string;
  const app = (
    <>
      <Header />
      <Title id={id} />
      <Details id={id} />
      <Similar id={id} />
    </>
  );

  res.setHeader("Content-Type", "text/html");
  res.write(
    `<!doctype html><html><head><meta charset="UTF-8"><link href="./index.css" rel="stylesheet"></head><body>`
  );

  for (let child of app.props.children) {
    const element = await child.type(child.props);
    res.write(renderToString(element));
  }

  res.write(`</body></html>`);
  res.end();
}
