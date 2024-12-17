# Vendure Qwik Storefront Starter️

An e-commerce storefront for [Vendure](https://www.vendure.io) built with [Qwik](https://qwik.builder.io/) & [Qwik City](https://qwik.builder.io/qwikcity/overview).

👉 [qwik-storefront.vendure.io](https://qwik-storefront.vendure.io)

## Core Web Vitals

<br/>

![pagespeed.web.dev](docs/metrics.png)

<br/>

### 📑 [Guide: Spin up an e-commerce app in 60s with Vendure + Qwik](https://dev.to/prasmalla/in-2023-set-up-a-nodejs-e-commerce-app-in-1-minute-with-vendure-qwik-bl7)

## Features

- Cart ✅
- Checkout flow ✅
- Search facet filters ✅
- Login ✅
- Account creation ✅
- Customer account management ✅
- SPA-mode navigation ✅
- Set up GraphQL code generation ✅

## Prerequisites

- Node.js version **20.x.x** or higher

You can check your current Node.js version by running:

```bash
node -v
```

- Make sure `yarn` is installed.

You can check current version of yarn by running:

```
yarn -v

```

if yarn is not installed, you can install it via the command:

```
npm install -g yarn
```

## Dependencies

The first step is to install all packages using the command:

```
yarn install
```

## Environment variables

Create a new file `.env` and copy all contents from `.env.example` copy to the `.env` file you just created. Make sure the required variables have values whereas the rest can be left blank.

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). During development, the `dev` command will server-side render (SSR) the output.

```shell
yarn run dev
```

This will run the application on port 8080 by default.

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to locally preview a production build, and it should not be used as a production server.

```shell
yarn preview
```

## Production

The production build will generate client and server modules by running both client and server build commands. Additionally, the build command will use Typescript to run a type check on the source code.

```shell
yarn build
```

## Deployment

There are multiple ways to deploy this application as referenced in [Qwik Deployment Guides](https://qwik.dev/docs/deployments/). But we will be following the [node express guide](https://qwik.dev/docs/deployments/node/) to deploy this application.

- Before the production build, run the command:

```
yarn run qwik add express
```

This will add a production ready express server to serve our application.

- The next step is to build the application using:

```
yarn run build
```

- The final step is to serve the application using:

```
yarn run serve
```

The application will now be available at port 3000 on the local machine. The default port can be overridden by adding `PORT` to the `.env` file.

## Related

- [Vendure Docs](https://vendure.io/docs)
- [Vendure Github](https://github.com/vendure-ecommerce/vendure)
- [Vendure Discord](https://vendure.io/community)
- [Qwik Docs](https://qwik.builder.io/)
- [Qwik Github](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Qwik Discord](https://qwik.builder.io/chat)

## Express Server

This app has a minimal [Express server](https://expressjs.com/) implementation. After running a full build, you can preview the build using the command:

```
yarn serve
```

Then visit [http://localhost:8080/](http://localhost:8080/)
