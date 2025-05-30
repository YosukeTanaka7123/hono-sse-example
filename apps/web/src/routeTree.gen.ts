/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TextStreamImport } from './routes/text-stream'
import { Route as SseImport } from './routes/sse'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TextStreamRoute = TextStreamImport.update({
  id: '/text-stream',
  path: '/text-stream',
  getParentRoute: () => rootRoute,
} as any)

const SseRoute = SseImport.update({
  id: '/sse',
  path: '/sse',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/sse': {
      id: '/sse'
      path: '/sse'
      fullPath: '/sse'
      preLoaderRoute: typeof SseImport
      parentRoute: typeof rootRoute
    }
    '/text-stream': {
      id: '/text-stream'
      path: '/text-stream'
      fullPath: '/text-stream'
      preLoaderRoute: typeof TextStreamImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/sse': typeof SseRoute
  '/text-stream': typeof TextStreamRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/sse': typeof SseRoute
  '/text-stream': typeof TextStreamRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/sse': typeof SseRoute
  '/text-stream': typeof TextStreamRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/sse' | '/text-stream'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/sse' | '/text-stream'
  id: '__root__' | '/' | '/sse' | '/text-stream'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SseRoute: typeof SseRoute
  TextStreamRoute: typeof TextStreamRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SseRoute: SseRoute,
  TextStreamRoute: TextStreamRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/sse",
        "/text-stream"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/sse": {
      "filePath": "sse.tsx"
    },
    "/text-stream": {
      "filePath": "text-stream.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
