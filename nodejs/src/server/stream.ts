import { Request, Response } from "express";
import { renderToString } from "react-dom/server";

import { Content } from "../components/Content.tsx";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";

export async function handleStream(_: Request, res: Response) {
  res.setHeader("Content-Type", "text/html");
  res.write("<!doctype html><html><body>");

  for (let component of [Header, Content, Footer]) {
    const element = await component();
    res.write(renderToString(element));
  }

  res.write("</body></html>");
  res.end();
}
