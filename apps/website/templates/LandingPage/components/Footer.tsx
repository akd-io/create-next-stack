import { Text } from "@mantine/core"
import React from "react"
import { Anchor } from "../../../components/Anchor"
import { Section } from "../../../components/Section"
import { SocialIcons } from "../../../components/SocialIcons"

export const Footer: React.FC = () => {
  return (
    <Section
      component="footer"
      innerProps={{
        gap: "24px",
      }}
    >
      <SocialIcons />
      <Text ta={{ base: "left", sm: "center" }}>
        Created by{" "}
        <Anchor href="https://akd.io/" target="_blank">
          Anders Damgaard
        </Anchor>{" "}
      </Text>
    </Section>
  )
}
