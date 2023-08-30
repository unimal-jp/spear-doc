import { markdownPlugin } from "@spearly/spear-markdown-plugin";

export default {
  "projectName": "Spear document",
  "generateSitemap": false,
  "srcDir": ["./src"],
  "distDir": "./dist-jp",
  "plugins": [
    markdownPlugin({
      directory: "data/jp",
    }),
  ]
};