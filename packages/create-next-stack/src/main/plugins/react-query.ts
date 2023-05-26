import endent from "endent"
import { createPlugin } from "../plugin"

export const reactQueryPlugin = createPlugin({
  id: "react-query",
  name: "React Query",
  description: "Adds support for React Query",
  active: ({ flags }) => Boolean(flags["react-query"]),
  devDependencies: {
    "@tanstack/react-query": {
      name: "@tanstack/react-query",
      version: "^4.0.0",
    },
    "@tanstack/react-query-devtools": {
      name: "@tanstack/react-query-devtools",
      version: "^4.0.0",
    },
  },
  technologies: [
    {
      id: "reactQuery",
      name: "React Query",
      description:
        "React Query is a data fetching library for React. It provides hooks for fetching, caching, and updating asynchronous data in React. It is designed to be flexible and composable, and can be used with any data source.",
      links: [
        { title: "Website", url: "https://tanstack.com/query/latest" },
        {
          title: "Docs",
          url: "https://tanstack.com/query/latest/docs/react/overview",
        },
        { title: "GitHub", url: "https://github.com/tanstack/query" },
      ],
    },
  ],
  slots: {
    app: {
      imports: endent`
        import React from "react";
        import {
          QueryClient,
          QueryClientProvider,
        } from "@tanstack/react-query";
        import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
      `,
      logic: endent`
        const [queryClient] = React.useState(() => new QueryClient());
      `,
      componentsStart: endent`
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
      `,
      componentsEnd: endent`
        </QueryClientProvider>
      `,
    },
  },
} as const)
