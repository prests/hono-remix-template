# Hono Remix Template

![E2E Tests](https://github.com/prests/hono-remix-template/actions/workflows/e2e.yaml/badge.svg?branch=main&event=schedule)

## Overview

This is an opinionated template for scaffolding a Remix application, powered by Hono! Below you'll find instructions on
getting started, the tech chosen, and more!

## Technologies

1. PNPM - Package manager
1. Typescript - Because who doesn't like type safety!
1. Hono - Web framework
1. Remix - React SSR meta-framework
1. Vite - Bundler
1. Vitest - Unit tests and integration tests
1. Playwright - E2E tests (these are expensive to run)
1. Github Actions - CI/CD
1. Docker - Create deployable images for easier deployments
1. Eslint/Prettier - Linting/Formatting

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

After running `pnpm install` various lifecycle scripts will run to setup git-hooks and certificates to utilize https for
the dev server.

### Setting up localhost

You'll need to modify your operating system's host file to include `local.example-test.com` this is helps with CORS and
CSP issues that can come up when just using `localhost` or `127.0.0.1`

### Running Dev Server

To start the dev server run the following and navigate to the url provided in the terminal:

```sh
pnpm dev
```

## Testing

To run unit/integration tests run the following:

```sh
pnpm test
```

## Linting, Formatting, and Typechecking

Most IDEs will take in the provided eslint and prettier configs and automatically format files on save. If not running
the following will check to make sure there are no styling issues:

```sh
pnpm lint # eslint check
pnpm format:verify # prettier check
pnpm typecheck # typechecking
```
