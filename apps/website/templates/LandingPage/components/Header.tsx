import { Flex, Heading, Text } from "@chakra-ui/react"
import { Section } from "../../../components/Section"
import { SocialIcons } from "../../../components/SocialIcons"

export const HeaderSection = () => {
  return (
    <Section as="header">
      <Flex direction="column" alignItems={["left", "center"]} gap="6">
        <Flex direction="column" alignItems={["left", "center"]} gap="1">
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
        </Flex>
        <Flex gap="8px" wrap="wrap">
          <a
            aria-label="Last commit"
            href="https://github.com/akd-io/create-next-stack/commits/develop"
          >
            <img
              alt=""
              src="https://img.shields.io/github/last-commit/akd-io/create-next-stack/develop?style=flat-square"
            />
          </a>
          <a
            aria-label="License"
            href="https://github.com/akd-io/create-next-stack/blob/develop/packages/create-next-stack/LICENSE"
          >
            <img
              alt=""
              src="https://img.shields.io/npm/l/create-next-stack?color=44cc11&style=flat-square"
            />
          </a>
          <a
            aria-label="NPM version"
            href="https://www.npmjs.com/package/create-next-stack"
          >
            <img
              alt=""
              src="https://img.shields.io/npm/v/create-next-stack?style=flat-square"
            />
          </a>
        </Flex>
        <SocialIcons />
      </Flex>
    </Section>
  )
}
