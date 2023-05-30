import { Flex } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"

type SectionProps = ComponentProps<typeof Flex> & {
  innerProps?: ComponentProps<typeof Flex>
}
export const Section: FC<SectionProps> = ({
  innerProps,
  children,
  ...props
}) => {
  return (
    <Flex
      direction="column"
      width="100%"
      px="30px"
      alignItems="center"
      as="section"
      {...props}
    >
      <Flex
        direction="column"
        width="100%"
        maxWidth="800"
        alignItems="center"
        {...innerProps}
      >
        {children}
      </Flex>
    </Flex>
  )
}
