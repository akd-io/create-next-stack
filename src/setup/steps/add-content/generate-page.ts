import { QuestionnaireAnswers } from "../../../questionnaire/questionnaire"
import { techValues } from "../../../questionnaire/questions/technologies"

export const generatePage = (
  answers: QuestionnaireAnswers
): string => /* tsx */ `
import Head from "next/head";
import React from "react";
${
  answers.technologies.includes(techValues.emotion) ||
  answers.technologies.includes(techValues.styledComponents)
    ? `import WithDefaultGlobalStyles from "./WithDefaultGlobalStyles";`
    : ``
}

type PageProps = {
  title: string;
  description: string;
};
const Page: React.FC<PageProps> = ({ title, description, children }) => {
  return (
    ${
      answers.technologies.includes(techValues.emotion) ||
      answers.technologies.includes(techValues.styledComponents)
        ? `<WithDefaultGlobalStyles>`
        : `<>`
    }
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    ${
      answers.technologies.includes(techValues.emotion) ||
      answers.technologies.includes(techValues.styledComponents)
        ? `</WithDefaultGlobalStyles>`
        : `</>`
    }
  );
};

export default Page;
`
