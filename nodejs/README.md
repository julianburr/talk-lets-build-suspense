# Let's Build Suspense 🥁 — NodeJS Version

## Getting started

```bash
# Install dependencies
yarn install

# Generate styles, run with `--watch` if you want to hot-reload changes
yarn generate:styles

# Start app
yarn dev
```

## What am I looking at?

- the core server logic is implemented in `src/server/index.tsx`
- to showcase the different "stages" (or implementation approaches) from the talk in a single codebase, in this repo they all coexist in separate server routes
  - http://localhost:3000/classic?id=tt11291274 - uses `src/server/classic.tsx` and showcases the classical server side rendered way
  - http://localhost:3000/stream?id=tt11291274 - uses `src/server/stream.tsx` and improves the classical approach by introducing streaming
  - http://localhost:3000/suspense?id=tt11291274 - uses `src/server/suspense.tsx`, which introduces the concept of out of order streaming and tries to demonstrate conceptually how Suspense on the server works
