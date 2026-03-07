import endent from "endent"
import { Plugin } from "../plugin"

export const reactQueryPlugin: Plugin = {
  id: "react-query",
  name: "React Query",
  description: "Adds support for React Query",
  active: ({ flags }) => Boolean(flags["react-query"]),
  devDependencies: [
    { name: "@tanstack/react-query", version: "^4.0.0" },
    { name: "@tanstack/react-query-devtools", version: "^4.0.0" },
  ],
  technologies: [
    {
      id: "reactQuery",
      name: "React Query",
      description:
        "React Query, aka. TanStack Query, is a data fetching library that provides hooks for fetching, caching, and updating, remote data. It has a declarative API that makes working with asynchronous data much easier than with previous solutions.",
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
}
