[日本語はこちら](./README_ja.md)

# Spear documentation Proposal

This repository is the proposal of Spear documentation.

## How to build?

It's easy to build. Just you type the `yarn` and `yarn build`

## How to edit?

This documentation site will fetch from local mdx file.  
The mdx is unified ecosystem[1], this file has `front-matter` fields and main content.  
A documentation use the `front-matter` as field.

The sample data of mdx is the following:

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
- This project use the directory name as `content type` and `content id`.
  - If directory is `/data/blog/test.mdx`, `content_type` is `blog` and `content id` is `test`.

## How it work?

The spear will introduce the injecting api client. [#189](https://github.com/unimal-jp/spear/pull/189)

This change bring the content collection feature to us.

You can see the mechanism of getting mdx file. [code](https://github.com/mantaroh/spear-doc/blob/967800439f9ed83120e7028a2375c6330b108683/spear.config.mjs#L74-L90)  
This code will use `front-matter` and `remark` libraries.

For detail, see the official documentation of these library. 
