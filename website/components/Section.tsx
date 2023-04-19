import { Box, Stack } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"

type SectionProps = ComponentProps<typeof Stack> & {
  boxProps?: ComponentProps<typeof Box>
}
export const Section: FC<SectionProps> = ({ boxProps, children, ...props }) => {
  return (
    <Stack width="100%" px="30px" alignItems="center" as="section" {...props}>
      <Stack width="100%" maxWidth="800" alignItems="center" {...boxProps}>
        {children}
      </Stack>
    </Stack>
  )
}
