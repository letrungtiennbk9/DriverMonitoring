/* eslint-disable global-require */
// https://umijs.org/config/
import { defineConfig } from "umi";
import { join } from "path";
import defaultSettings from "./defaultSettings";
import proxy from "./proxy";
import routes from "./routes";

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    ...defaultSettings,
    locale: true,
    siderWidth: 250,
    collapsedButtonRender: false,
  },

  locale: {
    // default zh-CN
    default: "en-US",
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: "@ant-design/pro-layout/es/PageLoading",
  },
  targets: {
    ie: 11,
  },

  routes,

  theme: {
    "primary-color": "#3e79f7",
    "border-radius-base": "0.3rem",
    "padding-xss": "8px",
  },
  fastRefresh: {},
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || "dev"],
  manifest: {
    basePath: "/",
  },

  extraPostCSSPlugins: [require("tailwindcss"), require("autoprefixer")],
  define: {
    'process.env.KLTN_WEBSOCKET_URL': process.env.KLTN_WEBSOCKET_URL,
  }
});
