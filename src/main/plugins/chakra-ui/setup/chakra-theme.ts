import endent from "endent"

export const chakraTheme = endent`
  import { extendTheme, ThemeConfig } from "@chakra-ui/react";

  const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };

  export const chakraTheme = extendTheme({ config });
`
