import Head from "next/head"
import React from "react"
import WithDefaultGlobalStyles from "./WithDefaultGlobalStyles"

type PageProps = {
  title: string
  description: string
  ogImageUrl: string
  children?: React.ReactNode
}
const Page: React.FC<PageProps> = ({
  title,
  description,
  ogImageUrl,
  children,
}) => {
  return (
    <WithDefaultGlobalStyles>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImageUrl} />

        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </WithDefaultGlobalStyles>
  )
}

export default Page
