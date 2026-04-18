import { Flex, FlexProps, polymorphic } from "@mantine/core"
import { ReactNode } from "react"

type SectionProps = FlexProps & {
  innerProps?: FlexProps
  children?: ReactNode
}

export const Section = polymorphic<"section", SectionProps>(
  ({ innerProps, children, ...props }: SectionProps) => {
    return (
      <Flex
        component="section"
        direction="column"
        w="100%"
        px="30px"
        align="center"
        {...props}
      >
        <Flex
          direction="column"
          w="100%"
          maw="800"
          align="center"
          {...innerProps}
        >
          {children}
        </Flex>
      </Flex>
    )
  },
)
