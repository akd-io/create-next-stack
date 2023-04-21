import {
  ExternalLinkIcon as ChakraExternalLinkIcon,
  IconProps,
} from "@chakra-ui/icons"
import { FC } from "react"

/**
 * This is a workaround for the following issue:
 * https://github.com/chakra-ui/chakra-ui/issues/3714#issuecomment-1518284403
 */
export const ExternalLinkIcon: FC<IconProps> =
  ChakraExternalLinkIcon as FC<IconProps>
