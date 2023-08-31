import { markdownPlugin } from "@spearly/spear-markdown-plugin";
import { spearSEO } from "@spearly/spear-cli/dist/plugins/spear-seo.js";

export default {
  "projectName": "Spear document",
  "generateSitemap": false,
  "srcDir": ["./src"],
  "distDir": "./dist-en",
  "plugins": [
    spearSEO(),
    markdownPlugin({
      directory: "data/en",
    }),
    (() => {

      return {
        pluginName: "doc-i18n",
        configuration: null,
        beforeBuild: null,
        afterBuild: null,
        bundle: null,
      }
    })(),
  ]
};