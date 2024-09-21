import { Request, Response } from "express";
import { renderToString } from "react-dom/server";

import { Header } from "../components/Header.tsx";
import { Title } from "../components/Title.tsx";
import { Details } from "../components/Details.tsx";
import { Similar } from "../components/Similar.tsx";

export async function handleClassic(req: Request, res: Response) {
  const id = req.query.id as string;
  const app = (
    <>
      <Header />
      <Title id={id} />
      <Details id={id} />
      <Similar id={id} />
    </>
  );

  let content = `<!doctype html><html><head><link href="./index.css" rel="stylesheet"></head><body>`;

  const contents = await Promise.all(
    app.props.children.map(async (child: any) => {
      const element = await child.type(child.props);
      return renderToString(element);
    })
  );

  content += contents.join("");
  content += `</body></html>`;

  res.setHeader("Content-Type", "text/html");
  res.send(content);
}
