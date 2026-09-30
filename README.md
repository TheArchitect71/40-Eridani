# 40-Eridani

Angular frontend for the Express/MongoDB backend in `../41-Eridani`.
Login, signup, post pagination, image uploads, editing, deleting, and saved authentication are preserved.

## Run locally

Use Node 26.10.0 (`.nvmrc`). Follow the local MongoDB setup in [41-Eridani](https://github.com/TheArchitect71/41-Eridani), then run its `npm start`. Its API runs on localhost:3000 and uses local MongoDB on port 27018.

In this directory:

```sh
npm ci
npm start
```

Open http://127.0.0.1:4200. Stop each foreground process with Ctrl+C.
Both environment files use localhost; fonts are system fonts and no external assets are required.

## Checks

```sh
npm run build
npm run typecheck
npm test -- --browsers=ChromeHeadless
```

Set `CHROME_BIN` to a local Chromium executable if Chrome is not installed in its standard location.
The obsolete Protractor/TSLint targets were removed. Unit tests cover authentication initialization, route guards, pagination mapping, and preserving uploaded image paths.

## Compatibility

Angular/CLI/build 22.2.0, Material/CDK 22.2.1, RxJS 7.8.2, Zone.js 0.16.3.
TypeScript 6.0.3 is held by Angular's `>=6.0 <6.1` peer constraint; TypeScript 7 is incompatible.
Jasmine 6.3.0/types 6.0.0 are held because Jasmine 7 makes global test functions read-only, causing Zone.js 0.16.3's test adapter to fail. This was reproduced in Chromium, and the Jasmine 6 test run passes.
Module-based components explicitly retain eager/Zone.js change detection so existing subscriptions update the UI under Angular 22. Existing untyped reactive forms and non-strict typing are preserved.

Official references: [Angular compatibility](https://angular.dev/reference/versions), [build migration](https://angular.dev/tools/cli/build-system-migration), and publisher metadata on [npm](https://registry.npmjs.org/@angular/material/latest).
