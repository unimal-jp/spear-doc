import fs from 'node:fs/promises'
import fm from 'front-matter'
import { remark } from 'remark';
import html from 'remark-html';
import { parse } from "node-html-parser"

export default {
  "projectName": "Spear document",
  "generateSitemap": false,
  "plugins": [
    (() => {

      const generateHashFromString = (str) => {
        let hash = 0;
        if (str.length === 0) return hash;
        for (let i = 0; i < str.length; i++) {
          const chr = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
      }
      const generateField = (fieldName, fieldValue) => {
        return {
          id: generateHashFromString(fieldValue),
          type: "field",
          attributes: {
            identifier: fieldName,
            inputType: fieldName === "body" ? "rich_text" : "text",
            value: fieldValue
          }
        }
      }
      const generateContent = (fields, contentId, fileCreatedAt, fileUpdatedAt) => {
        const fieldsData = fields.map(field => {
          return generateField(field.key, field.value)
        });
        return {
          id: contentId,
          type: "content",
          values: {},
          attributes: {
            contentAlias: contentId,
            createdAt: fileCreatedAt,
            nextContentId: null,
            patternName: "a",
            previousContentId: null,
            publicUid: contentId,
            publishedAt: fileUpdatedAt,
            updatedAt: fileUpdatedAt,
            fields: {
              data: fieldsData
            }
          }
        }
      }
      const generateLisit = (contents) => {
        return {
          totalContentsCount: contents.length,
          matchingContentsCount: contents.length,
          limit: contents.length,
          offset: 0,
          next: null,
          data: contents
        }
      }
      return {
        "pluginName": "markdown-client",
        "configuration": null,
        "beforeBuild": async (state, option) => {
          try {
            state.jsGenerator.injectFakeApiClient({
              analytics: {
                pageView: (params) => {
                  console.log("Unimplemented");
                },
              },
              getList: async (contentTypeId, params) => {
                console.log("Unimplemented");
                const dirs = await fs.readdir(`./data/${contentTypeId}`);
                const contents = [];
                for (const dir of dirs) {
                  const fileStat = await fs.stat(`./data/${contentTypeId}/${dir}`);
                  const file = await fs.readFile(`./data/${contentTypeId}/${dir}`);
                  const {attributes, body} = fm(file.toString());
                  const bodyHTML = await remark().use(html).process(body);
                  const fields = [];
                  for (const key of Object.keys(attributes)) {
                    fields.push({
                      key,
                      value: attributes[key]
                    });
                  }
                  fields.push({
                    key: "body",
                    value: bodyHTML.toString().replaceAll(/\n/g, '')
                  });
                  contents.push(generateContent(fields, dir, fileStat.birthtime, fileStat.mtime));
                }
                return generateLisit(contents);
              },
              // Generate content from markdown files
              getContent: async (contentTypeId, contentId, params) => {
                const fileStat = await fs.stat(`./data/${contentTypeId}/${contentId}.mdx`)
                const file = await fs.readFile(`./data/${contentTypeId}/${contentId}.mdx`)
                const {attributes, body} = fm(file.toString())
                const bodyHtml = await remark().use(html).process(body);
                const fields = [];
                for (const key of Object.keys(attributes)) {
                  fields.push({
                    key,
                    value: attributes[key]
                  })
                }
                fields.push({
                  key: "body",
                  value: bodyHtml.toString().replaceAll(/\n/g, '')
                })

                return generateContent(fields, contentId, fileStat.birthtime, fileStat.mtime)
              },
              getContentPreview: (contentTypeId, contentId, previewToken) => {
                console.log("Unimplemented");
              }
            })
            return state;
          } catch (e) {
            console.error(e)
          }
        },
        "afterBuild": null,
        "bundle": null,
      }
    }
    )(),
  ]
};