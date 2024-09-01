import { Request, Response } from "express";
import { renderToString } from "react-dom/server";

import { Content } from "../components/Content.tsx";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";

export async function handleClassic(_: Request, res: Response) {
  let content = "<!doctype html><html><body>";

  const elements = await Promise.all(
    [Header, Content, Footer].map(async (component) => {
      const element = await component();
      return element;
    })
  );

  elements.forEach((element) => {
    content += renderToString(element);
  });

  content += "</body></html>";

  res.setHeader("Content-Type", "text/html");
  res.send(content);
}
