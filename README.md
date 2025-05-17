# Hono SSE Example

## 概要

このプロジェクトは Hono を使用した Server-Sent Events (SSE) とテキストストリーミングのデモンストレーションです。バックエンドには Hono、フロントエンドには React + TanStack Router + shadcn/UI を使用しています。

## 特徴

- **Server-Sent Events (SSE)**: サーバーからクライアントへのリアルタイム単方向通信
- **Text Streaming**: サーバーからクライアントへのテキストストリーム
- **React Hooks**: SSE と ReadableStream を React で扱うためのカスタムフック
- **モダンな UI**: shadcn/UI を使用した美しいインターフェース

## Server-Sent Events (SSE) の概要

Server-Sent Events (SSE) は、Web サーバーからクライアントブラウザへのリアルタイムな単方向データ通信を実現する HTTP 技術です。以下の特徴があります：

- **単方向通信**: サーバーからクライアントへの一方通行のデータ配信
- **自動再接続**: 接続が切れた場合に自動的に再接続を試みる
- **イベント ID**: 最後に受信したイベントを追跡し、再接続時に途切れた部分から再開できる
- **標準的な HTTP**: WebSocket と異なり、特別なプロトコルを使わず標準的な HTTP を使用
- **イベント種別**: 異なる種類のイベントを送信し、クライアント側で適切に処理できる

### SSE の利用シーン

- リアルタイム通知
- チャットアプリケーション（サーバーからのメッセージ）
- ライブ更新（株価、スポーツスコア、天気予報など）
- 長時間実行される処理の進捗状況報告

### このプロジェクトでの SSE 実装

本プロジェクトでは、Hono の`streamSSE`機能を使ってサーバー側で SSE エンドポイントを実装し、React のカスタム Hook（`useSSE`）を使ってクライアント側で SSE を扱っています。エラー処理や再接続の仕組みも含まれており、実践的な SSE 実装のリファレンスとなっています。

### SSE の参考リンク集

以下は SSE について学ぶための信頼性の高い情報源です：

- **MDN Web Docs**

  - [Server-sent events](https://developer.mozilla.org/ja/docs/Web/API/Server-sent_events) - SSE の基本的な概念と使い方
  - [EventSource](https://developer.mozilla.org/ja/docs/Web/API/EventSource) - SSE のクライアント側 API
  - [Using server-sent events](https://developer.mozilla.org/ja/docs/Web/API/Server-sent_events/Using_server-sent_events) - 実装ガイド

- **W3C**

  - [Server-Sent Events 仕様](https://html.spec.whatwg.org/multipage/server-sent-events.html) - SSE の公式仕様

- **Hono ドキュメント**

  - [Streaming API](https://hono.dev/docs/helpers/streaming) - Hono での SSE 実装方法

- **ブラウザ対応状況**
  - [Can I use: Server-sent events](https://caniuse.com/eventsource) - 各ブラウザの SSE 対応状況

## プロジェクト構成

このプロジェクトは Turborepo を使用したモノレポ構成になっています：

- `apps/server`: Hono を使用したバックエンドサーバー
  - SSE エンドポイント（`/sse`）
  - テキストストリームエンドポイント（`/text-stream`）
- `apps/web`: React + Vite + TanStack Router を使用したフロントエンド
  - SSE ページ（`/sse`）
  - テキストストリームページ（`/text-stream`）

## セットアップと実行方法

### 前提条件

- Node.js 22 以上
- pnpm 10.8.0 以上

### インストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

これで以下のサーバーが起動します：

- バックエンド: http://localhost:8000
- フロントエンド: http://localhost:5173

## 技術スタック

- **バックエンド**:

  - [Hono](https://hono.dev/): 高速な Web フレームワーク
  - [Node.js](https://nodejs.org/): JavaScript 実行環境

- **フロントエンド**:

  - [React](https://reactjs.org/): UI ライブラリ
  - [TanStack Router](https://tanstack.com/router/): 型安全なルーティング
  - [shadcn/UI](https://ui.shadcn.com/): 美しい UI コンポーネント
  - [Vite](https://vitejs.dev/): 高速な開発サーバーとビルドツール

- **ツール**:
  - [Turborepo](https://turbo.build/): モノレポ管理ツール
  - [TypeScript](https://www.typescriptlang.org/): 型安全な JavaScript
  - [Biome](https://biomejs.dev/): リンターとフォーマッター
