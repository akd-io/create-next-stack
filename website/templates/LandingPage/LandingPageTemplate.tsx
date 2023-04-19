import { Box, Stack } from "@chakra-ui/react"
import { css, Global } from "@emotion/react"
import { ComponentProps, FC } from "react"
import { Section } from "../../components/Section"
import { Description } from "./components/DescriptionSection"
import { Footer } from "./components/Footer"
import { HeaderSection } from "./components/Header"
import { TechnologiesForm } from "./components/TechnologiesForm"

const globalStyles = css`
  body {
    background-color: #eee;
  }
`

const Card: FC<ComponentProps<typeof Box>> = (props) => (
  <Box
    width="100%"
    borderRadius={[30, 50]}
    padding={[30, 50, 70]}
    background="white"
    boxShadow="0 10px 50px rgba(0,0,0,0.1)"
    {...props}
  />
)

const LandingPageTemplate = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Stack spacing="16" align="center" py="16">
        <HeaderSection />
        <Stack as="main" spacing="16" align="center" width="100%">
          <Section>
            <Description />
          </Section>
          <Section>
            <Card>
              <TechnologiesForm />
            </Card>
          </Section>
        </Stack>
        <Footer />
      </Stack>
    </>
  )
}

export default LandingPageTemplate
