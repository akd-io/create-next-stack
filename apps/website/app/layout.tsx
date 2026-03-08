import "@mantine/core/styles.css"

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core"
import type { Metadata } from "next"
import PlausibleProvider from "next-plausible"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Create your Next.js project today! | Create Next Stack",
  description:
    "Create your Next.js project today! Create Next Stack is a website and CLI tool used to easily set up the boilerplate of new Next.js apps.",
  openGraph: {
    title: "Create your Next.js project today! | Create Next Stack",
    description:
      "Create your Next.js project today! Create Next Stack is a website and CLI tool used to easily set up the boilerplate of new Next.js apps.",
    type: "website",
    images: ["https://www.create-next-stack.com/thumbnail.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: "#eee", margin: 0 }}>
        <PlausibleProvider domain="create-next-stack.com">
          <Providers>{children}</Providers>
        </PlausibleProvider>
      </body>
    </html>
  )
}
