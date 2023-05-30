import { Radio as ChakraRadio } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"

export const Radio: FC<ComponentProps<typeof ChakraRadio>> = (props) => {
  return <ChakraRadio size="md" colorScheme="purple" {...props} />
}
