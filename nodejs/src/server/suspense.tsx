import { Request, Response } from "express";
import { renderToString } from "react-dom/server";

import { Content } from "../components/Content.tsx";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { Loading } from "../components/Loading.tsx";
import { Suspense, suspended } from "../components/Suspense.tsx";

export async function handleSuspense(_: Request, res: Response) {
  res.setHeader("Content-Type", "text/html");
  res.write("<!doctype html><html><body>");

  for (let component of [
    [Header],
    [Suspense, { fallback: Loading, content: Content }],
    [Footer],
  ]) {
    const element = await (component[0] as any)(component[1]);
    res.write(renderToString(element));
  }

  if (Object.keys(suspended).length) {
    await Promise.all(
      Object.entries(suspended).map(async ([key, content]: [any, any]) => {
        const element = await content();
        res.write(
          renderToString(
            <div style={{ background: "red", color: "white" }}>
              <p>SUSPENSE #{key}:</p>
              {element}
            </div>
          )
        );
        delete suspended[key];
      })
    );
  }

  res.write("</body></html>");
  res.end();
}
