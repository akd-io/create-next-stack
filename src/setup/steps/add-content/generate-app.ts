import { QuestionnaireAnswers } from "../../../questionnaire/questionnaire"
import { techValues } from "../../../questionnaire/questions/technologies"

export const generateApp = (
  answers: QuestionnaireAnswers
): string => /* tsx */ `
import { AppType } from "next/dist/next-server/lib/utils";
${
  answers.technologies.includes(techValues.cssModules)
    ? `import "../styles/global-styles.css";`
    : ""
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
`
