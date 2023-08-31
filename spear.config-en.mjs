import { markdownPlugin } from "@spearly/spear-markdown-plugin";
import { spearSEO } from "@spearly/spear-cli/dist/plugins/spear-seo.js";
import { remark } from "remark";
import html from "remark-html";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";

const preprocessor = rehype().use(rehypeHighlight) //remark().use(html);

export default {
  "projectName": "Spear document",
  "generateSitemap": false,
  "srcDir": ["./src"],
  "distDir": "./dist-en",
  "plugins": [
    spearSEO("./seo.config.mjs"),
    markdownPlugin({
      directory: "data/en",
      // processor: preprocessor,
      bodyPostProcessor: (body) => {
        return body.replaceAll("\n", "");
      },
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