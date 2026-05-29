/** @jsxImportSource vue */

import { Request, Response } from "express";

import { Header } from "../components/Header.tsx";
import { Title } from "../components/Title.tsx";
import { Details } from "../components/Details.tsx";
import { Similar } from "../components/Similar.tsx";
import { renderToString } from "@vue/server-renderer";
import { VNode } from "vue";

export async function handleStream(req: Request, res: Response) {
  const id = req.params.id as string;
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
    `<!doctype html><html><head><meta charset="UTF-8"><link href="/index.css" rel="stylesheet"><link rel="icon" type="image/png" href="/favicon.png"></head><body>`,
  );

  const children = Array.isArray(app?.children)
    ? app?.children
    : [app?.children];
  for (let child of children) {
    const content = await renderToString(child as VNode);
    res.write(content);
  }

  res.write(`</body></html>`);
  res.end();
}
