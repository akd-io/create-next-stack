import { NextPage } from "next"
import Page from "../components/Page"
import LandingPageTemplate from "../templates/LandingPage/LandingPageTemplate"

const title = "Create your Next.js project today! | Create Next Stack"
const description =
  "Create your Next.js project today! Create Next Stack is a website and CLI tool used to easily set up the boilerplate of new Next.js apps."

const Index: NextPage = () => {
  return (
    <Page
      title={title}
      description={description}
      ogImageUrl="https://www.create-next-stack.com/thumbnail.png"
    >
      <LandingPageTemplate />
    </Page>
  )
}

export default Index
