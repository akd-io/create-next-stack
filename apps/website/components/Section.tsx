import { Flex, polymorphic } from "@mantine/core"
import type { FlexProps } from "@mantine/core"

type SectionProps = FlexProps & {
  innerProps?: FlexProps
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
