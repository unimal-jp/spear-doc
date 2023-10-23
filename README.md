[日本語はこちら](./README_ja.md)

# Spear documentation Proposal

This repository is the Spear documentation.

## How to build?

It's easy to build. Just you type the `yarn install` and `yarn serve`

## How to edit?

The content of this document site will fetch from local mdx file.  
The mdx is [unified ecosystem](https://unifiedjs.com/), this file has `front-matter` fields and main content.    
A documentation use the `front-matter` as field.

The sample content of mdx is the following:

```
---
title: Test posting
---

# test posting

this is test posting.

## menu

Sub menu document.
```

This document project treat `title` field as field type. In this case, this doc has `title` field (text field type) and `body` field (rich text field type).

Note that:
- At the moment, this project use `text` and `rich text` field only.
- This project use the directory name as `content type` and file name as `content id`.
  - If directory is `/data/blog/test.mdx`, `content_type` is `blog` and `content id` is `test`.

## How it work?

The api client of the spear can be changeable. [#189](https://github.com/unimal-jp/spear/pull/189)

This change bring the content collection feature to us.

You can see the mechanism of getting mdx file. [code](https://github.com/mantaroh/spear-doc/blob/967800439f9ed83120e7028a2375c6330b108683/spear.config.mjs#L74-L90)  
This code will use `front-matter` and `remark` libraries.

For detail, see the official documentation of these library. 

## Contribute for translation

If you are interedted in translation, we are welcome to your contribution!

There are two type of translation.

1. Translate for the new languages : This document has two language, it mean Japanese and English. If you can translate into other language, we want you to translate it.

2. Translate the untranslated document: There a lot of untranslated document. Please try it!

You can find translate issue by filtering translate tag.
