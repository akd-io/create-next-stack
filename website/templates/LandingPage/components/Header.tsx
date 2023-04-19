import { Heading, Stack, Text } from "@chakra-ui/react"
import { Section } from "../../../components/Section"
import { SocialIcons } from "../../../components/SocialIcons"

export const HeaderSection = () => {
  return (
    <Section as="header">
      <Stack align={["left", "center"]} spacing="6">
        <Stack align={["left", "center"]} spacing="1">
          <Heading
            as="h1"
            size="3xl"
            bgGradient="linear(to-tr, brand.600, brand.400)"
            bgClip="text"
            textAlign={["left", "center"]}
            fontWeight="800"
          >
            Create Next Stack
          </Heading>
          <Text
            fontSize="1.25em"
            fontWeight="bold"
            bgGradient="linear(to-tr, brand.600, brand.400)"
            bgClip="text"
            textAlign={["left", "center"]}
          >
            The ultimate starter kit for Next.js
          </Text>
        </Stack>
        <SocialIcons />
      </Stack>
    </Section>
  )
}
