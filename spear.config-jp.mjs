import { markdownPlugin } from "@spearly/spear-markdown-plugin";
import { spearSEO } from "@spearly/spear-cli/dist/plugins/spear-seo.js";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkToc from "remark-toc";
import { parse } from "node-html-parser";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(remarkToc)
  .use(rehypeStringify, { allowDangerousHtml: true })

export default {
  "projectName": "Spear document",
  "generateSitemap": false,
  "srcDir": ["./src"],
  "distDir": "./dist-jp",
  "plugins": [
    spearSEO("./seo.config.mjs"),
    markdownPlugin({
      directory: "data/jp",
      processor: processor,
      bodyPostProcessor: (body) => {
        return body.replaceAll("\n", "");
      },
    }),
    (() => {
      return {
        pluginName: "doc-line-break-convert",
        configuration: null,
        beforeBuild: null,
        afterBuild: async (state) => {
          const pages = state.pagesList;
          for (const page of pages) {
            const rawHtml = page.rawData
                                .replaceAll("\\\\n", "\n")  // Line break
                                .replaceAll("\\'", "'")     // Single quote
                                .replaceAll("%7B%7Blang%7D%7D", "jp") // Language specific syntax({{lang}})
                                .replaceAll("{{lang}}", "jp")
            const element = parse(rawHtml);
            page.rawData = rawHtml;
            page.node = element;
          }
        },
        bundle: null,
      }
    })(),
  ]
};