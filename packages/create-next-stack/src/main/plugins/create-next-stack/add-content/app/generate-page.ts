import aldent from "aldent"

export const generateAppPage = (): string => aldent`
  import LandingPageTemplate from "../templates/LandingPage/LandingPageTemplate.ts";

  export default function Home() {
    return <LandingPageTemplate />;
  }
`
