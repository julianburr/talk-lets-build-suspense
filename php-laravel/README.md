# Let's Build Suspense 🥁 — PHP Version (Laravel)

## Getting started

```bash
# Install dependencies
pnpm install
composer install

# Generate styles, run with `--watch` if you want to hot-reload changes
pnpm generate:styles
pnpm serve:styles

cp .env.example .env
php artisan key:generate

# Start app
php artisan serve
```

## What am I looking at?

- to showcase the different "stages" (or implementation approaches) from the talk in a single codebase, in this repo they all coexist in separate server routes, all defined in `routes/web.php`:
    - http://localhost:8000/classic/tt11291274 - showcases the classical server side rendered way
    - http://localhost:8000/stream/tt11291274 - improves the classical approach by introducing streaming
    - http://localhost:8000/suspense/tt11291274 - which introduces the concept of out of order streaming
