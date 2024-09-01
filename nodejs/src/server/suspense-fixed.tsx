import { Request, Response } from "express";
import { renderToString } from "react-dom/server";

import { Content } from "../components/Content.tsx";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { Loading } from "../components/Loading.tsx";
import { Suspense, suspended } from "../components/Suspense.tsx";

export async function handleSuspenseFixes(_: Request, res: Response) {
  res.setHeader("Content-Type", "text/html");
  res.write(`<!doctype html><html><body>`);

  for (let component of [
    [Header],
    [Suspense, { fallback: Loading, content: Content }],
    [Footer],
  ]) {
    const element = await (component[0] as any)(component[1]);
    res.write(renderToString(element));
  }

  if (Object.keys(suspended).length) {
    res.write(`
      <script>
        window.customElements.define('stream-content', class StreamContent extends HTMLElement {
          connectedCallback () {
            const content = this.previousElementSibling.content;
            const id = this.getAttribute('target-id');
            const target = document.querySelector('[data-stream-id="' + id + '"]');

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
        const element = await content();
        res.write(
          renderToString(
            <>
              <template>{element}</template>

              {/* @ts-ignore */}
              <stream-content target-id={key} />
            </>
          )
        );
        delete suspended[key];
      })
    );
  }

  res.write(`</body></html>`);
  res.end();
}
