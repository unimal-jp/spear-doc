[English](./README.md)

# Spear ドキュメントサイトプロポーサル

このレポジトリは、Spear のドキュメントサイトの提案用です。

## ビルド方法

簡単に `yarn` と `yarn build` コマンドを実行することで確認できます。

## 編集方法

このドキュメントサイトはローカルの mdx ファイルをフェッチします。
MDX は unified ecosystem[1] で、`フロントマター` フィールドとメインコンテンツ部分を持ちます。
`フロントマター` をフィールドとして利用します。

以下に mdx のサンプルコードを示します。

```
---
title: Test posting
---

# test posting

this is test posting.

## menu

Sub menu document.
```

このドキュメントサイトでは `title` をフィールドタイプとして扱います。この場合、 `title` フィールドはテキストとして、 `body` フィールドはリッチテキストとして扱います。

注意:
- At the moment, this project use `text` and `rich text` field only.
- This project use the directory name as `content type` and `content id`.
  - If directory is `/data/blog/test.mdx`, `content_type` is `blog` and `content id` is `test`.

## How it work?

The spear will introduce the injecting api client. [#189](https://github.com/unimal-jp/spear/pull/189)

This change bring the content collection feature to us.

You can see the mechanism of getting mdx file. [code](https://github.com/mantaroh/spear-doc/blob/967800439f9ed83120e7028a2375c6330b108683/spear.config.mjs#L74-L90)  
This code will use `front-matter` and `remark` libraries.

For detail, see the official documentation of these library. 
