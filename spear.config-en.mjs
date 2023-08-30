import { markdownPlugin } from "@spearly/spear-markdown-plugin";

export default {
  "projectName": "Spear document",
  "generateSitemap": false,
  "srcDir": ["./src"],
  "distDir": "./dist-en",
  "plugins": [
    markdownPlugin({
      directory: "data/en",
    }),
  ]
};