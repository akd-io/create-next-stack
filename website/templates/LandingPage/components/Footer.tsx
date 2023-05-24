import { Text } from "@chakra-ui/react"
import React from "react"
import { Anchor } from "../../../components/Anchor"
import { Section } from "../../../components/Section"
import { SocialIcons } from "../../../components/SocialIcons"

export const Footer: React.FC = () => {
  return (
    <Section
      as="footer"
      innerProps={{
        gap: "24px",
      }}
    >
      <SocialIcons />
      <Text align={["left", "center"]}>
        Created by{" "}
        <Anchor href="https://akd.io/" isExternal>
          Anders Damgaard
        </Anchor>{" "}
      </Text>
    </Section>
  )
}
