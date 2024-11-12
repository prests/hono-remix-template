# Hono Remix Template &middot; [![E2E Tests](https://github.com/prests/hono-remix-template/actions/workflows/e2e.yaml/badge.svg?branch=main&event=push)](https://github.com/prests/hono-remix-template/actions/workflows/e2e.yaml?query=branch:main+event:push) [![CI Tests](https://github.com/prests/hono-remix-template/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/prests/hono-remix-template/actions/workflows/ci.yaml?query=branch:main+event:push)

This opinionated template combines the power of Remix for server-side rendering and the lightweight Hono framework to
make building and deploying full-stack apps simple and efficient. It’s set up with sensible defaults for modern
development practices, including testing, CI/CD, type safety, and consistent code formatting. Perfect for developers
looking to scaffold a performant web app quickly.

If you’re familiar with these tools, you'll feel right at home, and if not, I hope this setup makes it easy to dive in!

## Overview of Chosen Technologies

Below I've laid out the technologies used in this project and some back stories behind them. These are just tools that
I've used and loved. I'm sure there's other great stuff out there like Deno, which I want to try out in the future.
Don't feel like this is the only way to achieve the same result

### Build Related Tooling

- [PNPM](https://pnpm.io/) - super-efficient package manager that saves space and helps keep dependencies organized,
  which is a big plus for complex projects.
- [Vite](https://vite.dev/) - quick, no-fuss bundler that’s great for modern frameworks and makes development faster
  with instant hot reloads.
- [Github Actions](https://github.com/features/actions) - automates testing, linting, and deploying, all within GitHub,
  so you can speed up your workflow without leaving your repo.
- [Docker](https://www.docker.com/) - package everything into containers, so deployments are consistent and easy no
  matter where you're running them.

Each of these tools addresses a key aspect of the build process—from managing dependencies efficiently (PNPM), to
creating a fast dev experience (Vite), automating quality checks (GitHub Actions), and ensuring reliable deployments
(Docker).

### Web/Rendering Tooling

- [React](https://react.dev/) - super popular library for building user interfaces, letting you create reusable
  components that make your app easier to maintain.
- [Hono](https://hono.dev/) - lightweight web framework with a focus on speed, great for creating APIs or simple web
  apps with minimal setup.
- [Remix](https://remix.run/) - takes React to the next level by offering server-side rendering (SSR), which helps make
  your app faster and more SEO-friendly.
- [Radix](https://www.radix-ui.com/primitives) - UI components that are accessible and customizable, perfect if you’re
  building your own design system from scratch.
- [StyleX](https://stylexjs.com/docs/learn/) - fresh take on styling in JavaScript, offering new tools to make styling
  easier and more modular.

Each of these choices was made to create a responsive, SEO-friendly, and scalable front end, with flexibility for UI and
styling so you can adapt as project requirements evolve.

### Testing

- [Vitest](https://vitest.dev/) - great for running unit and integration tests; it's fast and works seamlessly with
  modern JavaScript frameworks, so you can easily test components and functions in isolation.
- [Playwright](https://playwright.dev/) - handles end-to-end (E2E) testing, simulating real user interactions across
  different browsers, which is super useful for ensuring everything works together as expected.

With Vitest handling isolated testing and Playwright covering real-world scenarios, you can be confident in both the
small parts and the overall behavior of your app.

### Linting, Formatting, and Typechecking

- [Typescript](https://www.typescriptlang.org/) - adds type safety to JavaScript, which helps catch errors early and
  makes code easier to understand.
- [ESlint](https://eslint.org/) - enforces coding standards and best practices, catching common errors and keeping code
  consistent across the team.
- [Prettier](https://prettier.io/) - takes care of formatting, so you don’t have to worry about spaces, indentation, or
  style debates—it just makes everything look good automatically.

This set of tools not only helps keep the codebase error-free but also ensures consistency, which is especially
important when multiple developers are contributing.

## Setup

### Install Setup NVM, PNPM, and Dependencies

I find [NVM](https://github.com/nvm-sh/nvm) to be a great way to switch between node versions when working on multiple
projects. Whether it's node v20, v18, or v8 NVM can quickly swap node versions!

Once NVM is setup run the following:

```sh
nvm install
npm i -g pnpm@^8
pnpm install
```

Alternatively, you can use [corepack](https://github.com/nodejs/corepack) to manage your package management.

After running `pnpm install` various lifecycle scripts will run to setup git hooks and certificates to utilize https for
the dev server.

### Setting Up Localhost

You'll need to modify your operating system's host file to include `local.example-test.com` this is helps with CORS and
CSP issues that can come up when just using `localhost` or `127.0.0.1`

### Setting Up Environment Variables

Most production applications require environment variables to configure settings securely. We’ll set up a `.env` file to
inject variables locally, making them accessible via process.env. This template also uses [Zod](https://zod.dev/) to
ensure type safety when loading these variables.

1. Create a `.env` file at the root of the project and add the following values:

```sh
ABORT_DELAY=5000
APP_NAME=Example App
```

2. These variables are now accessible on the `process.env` object when the server starts and validated with Zod to catch
   any type issues early.

### Running Dev Server

To start the dev server run the following and navigate to the url provided in the terminal:

```sh
pnpm dev
```

## Testing

- **Unit/Integration Tests:** Run the following to test individual components or functions in isolation:

```sh
pnpm test
```

- **End-to-End (E2E) Tests:** Run the following to simulate user interactions across different browsers:

```sh
pnpm test:e2e:local
```

## Linting, Formatting, and Typechecking

Most IDEs will take in the provided eslint and prettier configs and automatically format files on save. If not running
the following will check to make sure there are no styling issues:

```sh
pnpm lint # eslint check
pnpm format:verify # prettier check
pnpm typecheck # typechecking
```
