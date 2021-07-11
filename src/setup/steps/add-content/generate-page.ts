export const generatePage = (): string => /* tsx */ `
import Head from "next/head";
import React from "react";
import WithDefaultGlobalStyles from "./WithDefaultGlobalStyles";

type PageProps = {
  title: string;
  description: string;
};
const Page: React.FC<PageProps> = ({ title, description, children }) => {
  return (
    <WithDefaultGlobalStyles>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </WithDefaultGlobalStyles>
  );
};

export default Page;
`
