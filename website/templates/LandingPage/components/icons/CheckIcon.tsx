import { CheckIcon as ChakraCheckIcon, IconProps } from "@chakra-ui/icons"
import { FC } from "react"

/**
 * This is a workaround for the following issue:
 * https://github.com/chakra-ui/chakra-ui/issues/3714#issuecomment-1518284403
 */
export const CheckIcon: FC<IconProps> = ChakraCheckIcon as FC<IconProps>
