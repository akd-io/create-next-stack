"use client"

import { Box, Flex } from "@mantine/core"
import { FC, ReactNode } from "react"
import { Section } from "../../components/Section"
import { Description } from "./components/Description"
import { Footer } from "./components/Footer"
import { HeaderSection } from "./components/Header"
import { Newsletter } from "./components/NewsletterSection"
import { TechnologiesForm } from "./components/TechnologiesForm"

const Card: FC<{ children?: ReactNode }> = ({ children }) => (
  <Box
    w="100%"
    style={{
      borderRadius: "clamp(30px, 5vw, 50px)",
      boxShadow: "0 10px 50px rgba(0,0,0,0.1)",
    }}
    p={{ base: 30, sm: 50, md: 70 }}
    bg="white"
  >
    {children}
  </Box>
)

const LandingPageTemplate = () => {
  return (
    <Flex direction="column" gap="64" align="center" py="64">
      <HeaderSection />
      <Flex
        component="main"
        direction="column"
        gap="64"
        align="center"
        w="100%"
      >
        <Section>
          <Description />
        </Section>
        <Section>
          <Card>
            <TechnologiesForm />
          </Card>
        </Section>
      </Flex>
      <Section pt="20px">
        <Newsletter />
      </Section>
      <Footer />
    </Flex>
  )
}

export default LandingPageTemplate
