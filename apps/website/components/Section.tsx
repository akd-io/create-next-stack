import { Box, Flex, FlexProps } from "@mantine/core"
import { FC, ReactNode } from "react"

type SectionProps = Omit<FlexProps, "component"> & {
  innerProps?: FlexProps
  children?: ReactNode
  as?: "section" | "header" | "footer"
}
export const Section: FC<SectionProps> = ({
  innerProps,
  children,
  as: Element = "section",
  ...props
}) => {
  return (
    <Box component={Element}>
      <Flex direction="column" w="100%" px="30px" align="center" {...props}>
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
    </Box>
  )
}
