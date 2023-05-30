import {
  IconProps,
  InfoOutlineIcon as ChakraInfoOutlineIcon,
} from "@chakra-ui/icons"
import { FC } from "react"

/**
 * This is a workaround for the following issue:
 * https://github.com/chakra-ui/chakra-ui/issues/3714#issuecomment-1518284403
 */
export const InfoOutlineIcon: FC<IconProps> =
  ChakraInfoOutlineIcon as FC<IconProps>
