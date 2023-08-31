import { parse } from 'node-html-parser';
import { minify } from "html-minifier-terser";

const dummyContent = {
  id: "dummy",
  type: "content",
  values: {},
  attributes: {
      contentAlias: "sample",
      createdAt: "",
      nextContentId: null,
      patternName: "a",
      previousContentId: null,
      publicUid: "sample",
      publishedAt: "",
      updatedAt: "",
      fields: {
          data: [
            {
              id: "sample",
              type: "field",
              attributes: {
                  identifier: "dummy",
                  inputType: "text",
                  value: "dummy"
              }
            }
          ]
      }
  }
};

const dummyList = {
  totalContentsCount: 1,
  matchingContentsCount: 1,
  limit: 1,
  offset: 0,
  next: null,
  data: [dummyContent]
}

export default {
  "projectName": "Spear document",
  "generateSitemap": false,
  "srcDir": ["./src"],
  "distDir": "./dist-redirect",
  "plugins": [
    {
      "pluginName": "redirect-plugin",
      "configuration": null,
      "beforeBuild": async(state) => {
        // Inject fake api client
        state.jsGenerator.injectFakeApiClient({
          analytics: {
              pageView: () => {
                  console.log("Unimplemented");
                  return Promise.resolve();
              },
          },
          getList: async () => {
            return Promise.resolve(dummyList);
          },
          // Generate content from markdown files
          getContent: async () => {
            return Promise.resolve(dummyContent);
          },
          getContentPreview: () => {
            return Promise.resolve(null);
          },

        })
        return state
      },
      "afterBuild": async(state) => {
        try {
          for (const page of state.pagesList) {
            // 
            let html = await minify(page.rawData);
            console.log("😺😺😺😺😺😺");
            console.log(html);
                // add redirect option to meta tag
            const reidirectURL = `jp/${page.fname.replace(/^\//, "")}.html`;
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