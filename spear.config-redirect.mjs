import { parse } from 'node-html-parser';
import { minify } from "html-minifier-terser";
import { markdownPlugin } from "@spearly/spear-markdown-plugin";

const DEFAULT_FALLBACK_LANG = "en";

export default {
  "projectName": "Spear document",
  "generateSitemap": false,
  "srcDir": ["./src"],
  "distDir": "./dist-redirect",
  "plugins": [
    markdownPlugin({
      directory: "data/en",
    }),
    {
      "pluginName": "redirect-plugin",
      "configuration": null,
      "beforeBuild": null,
      "afterBuild": async(state) => {
        try {
          for (const page of state.pagesList) {
            // 
            let html = await minify(page.rawData);
                // add redirect option to meta tag
            const reidirectURL = `/${DEFAULT_FALLBACK_LANG}/${page.fname.replace(/^\//, "")}.html`;
            html = html.replace(/<\/head>/g, `<meta http-equiv="refresh" content="0; url=${reidirectURL}"></head>`);
            html = html.replace(/<body[^>]*>((.|[\n\r])*)<\/body>/,"");
            page.rawData = html;
            page.node = parse(html);
          }
        } catch (e) {
          console.log(e);
        }
        return state
      },
      "bundle": null
    },
  ]
};
