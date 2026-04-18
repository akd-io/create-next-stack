import { Flex, Text } from "@mantine/core"
import { Section } from "../../../components/Section"
import { SocialIcons } from "../../../components/SocialIcons"

export const HeaderSection = () => {
  return (
    <Section component="header">
      <Flex
        direction="column"
        align={{ base: "flex-start", sm: "center" }}
        gap="24"
      >
        <Flex
          direction="column"
          align={{ base: "flex-start", sm: "center" }}
          gap="4"
        >
          <Text
            component="h1"
            fz={{ base: "2.5rem", sm: "3rem" }}
            fw={800}
            ta={{ base: "left", sm: "center" }}
            variant="gradient"
            gradient={{ from: "#6838F1", to: "#DC51F2", deg: 135 }}
            lh={1.2}
          >
            Create Next Stack
          </Text>
          <Text
            fz="1.25em"
            fw="bold"
            ta={{ base: "left", sm: "center" }}
            variant="gradient"
            gradient={{ from: "#6838F1", to: "#DC51F2", deg: 135 }}
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
