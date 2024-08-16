import * as express from "express";
import {
  createProxyMiddleware,
  Filter,
  Options,
  RequestHandler,
} from "http-proxy-middleware";

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://rest.sandbox.lalamove.com",
    changeOrigin: true,
  })
);

app.listen(3000);
