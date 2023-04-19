import { Link } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"

export const Anchor: FC<ComponentProps<typeof Link>> = (props) => {
  return <Link color="#319bff" fontWeight="bold" {...props} />
}
