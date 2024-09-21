import { Request, Response } from "express";
import { renderToString } from "react-dom/server";

import { Header } from "../components/Header.tsx";
import { Title, TitleSkeleton } from "../components/Title.tsx";
import { Details, DetailsSkeleton } from "../components/Details.tsx";
import { Similar, SimilarSkeleton } from "../components/Similar.tsx";
import { Suspense, suspended } from "../components/Suspense.tsx";

export async function handleSuspense(req: Request, res: Response) {
  const id = req.query.id as string;
  const app = (
    <>
      <Header />
      <Suspense fallback={<TitleSkeleton />}>
        <Title id={id} />
      </Suspense>
      <Suspense fallback={<DetailsSkeleton />}>
        <Details id={id} />
      </Suspense>
      <Suspense fallback={<SimilarSkeleton />}>
        <Similar id={id} />
      </Suspense>
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

  if (Object.keys(suspended).length) {
    res.write(`
      <script>
        window.customElements.define('suspense-content', class SuspenseContent extends HTMLElement {
          connectedCallback () {
            const content = this.previousElementSibling.content;
            const id = this.getAttribute('target-id');
            const target = document.querySelector('[data-suspense-id="' + id + '"]');

            target.innerHTML = '';
            while (content.firstChild) {
              target.appendChild(content.firstChild);
            }
          }
        })
      </script>
    `);

    await Promise.all(
      Object.entries(suspended).map(async ([key, content]: [any, any]) => {
        const children = Array.isArray(content) ? content : [content];
        const contents = await Promise.all(
          children.map(async (child: any) => {
            const element = await child.type(child.props);
            return renderToString(element);
          })
        );
        res.write(`
          <template>${contents.join("")}</template>
          <suspense-content target-id="${key}"></suspense-content>
        `);
        delete suspended[key];
      })
    );
  }

  res.write(`</body></html>`);
  res.end();
}
