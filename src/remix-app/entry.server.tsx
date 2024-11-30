import { PassThrough } from 'node:stream';

import { createReadableStreamFromReadable } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { renderHeadToString } from 'remix-island';

import { Head } from './Document';
import NonceProvider from './hooks/nonce';

import type { AppLoadContext, EntryContext } from '@remix-run/node';

const CLOSING_HTML = '</div></body></html>' as const;

const generateOpeningHTML = (nonce: string, headStr: string) =>
  `<!DOCTYPE html><html><head><meta charSet="utf-8" nonce="${nonce}" />${headStr}</head><body><div id="root">`;

const handleRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) =>
  isbot(request.headers.get('user-agent') ?? '')
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext);

const handleBotRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) =>
  new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={loadContext.nonce}>
        <RemixServer context={remixContext} url={request.url} abortDelay={loadContext.env.ABORT_DELAY} />
      </NonceProvider>,
      {
        onAllReady() {
          shellRendered = true;
          const headStr = renderHeadToString({ request, remixContext, Head });
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          body.write(generateOpeningHTML(loadContext.nonce, headStr));
          pipe(body);
          body.write(CLOSING_HTML);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, loadContext.env.ABORT_DELAY);
  });

const handleBrowserRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) =>
  new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={loadContext.nonce}>
        <RemixServer context={remixContext} url={request.url} abortDelay={loadContext.env.ABORT_DELAY} />
      </NonceProvider>,
      {
        onShellReady() {
          shellRendered = true;
          const headStr = renderHeadToString({ request, remixContext, Head });
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          body.write(generateOpeningHTML(loadContext.nonce, headStr));
          pipe(body);
          body.write(CLOSING_HTML);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, loadContext.env.ABORT_DELAY);
  });

export default handleRequest;
