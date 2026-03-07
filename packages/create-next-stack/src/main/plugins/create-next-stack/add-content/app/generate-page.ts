import endent from "endent"

export const generateAppPage = (): string => endent`
  import LandingPageTemplate from "../templates/LandingPage/LandingPageTemplate";

  export default function Home() {
    return <LandingPageTemplate />;
  }
`
