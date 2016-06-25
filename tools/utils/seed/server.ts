import * as express from 'express';
import * as fallback from 'express-history-api-fallback';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import * as codeChangeTool from './code_change_tools';
import {resolve} from 'path';
import {APP_BASE, PROD_DEST, PORT, DOCS_DEST, DOCS_PORT, COVERAGE_PORT} from '../../config';


export function serveSPA() {
  codeChangeTool.listen();
}

export function notifyLiveReload(e:any) {
  let fileName = e.path;
  codeChangeTool.changed(fileName);
}

export function serveProd() {
  let root = resolve(process.cwd(), PROD_DEST);
  let server = express();

  server.use(APP_BASE, serveStatic(root));

  server.use(fallback('index.html', { root }));

  server.listen(PORT, () =>
    openResource('http://localhost:' + PORT + APP_BASE)
  );
}
