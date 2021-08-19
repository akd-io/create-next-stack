import endent from "endent"
import type { ValidCNSInputs } from "../../../create-next-stack-types"

export const generateTheme = ({ flags }: ValidCNSInputs): string => {
  if (flags.chakra) {
    return endent/* tsx */ `
    import { extendTheme, ThemeConfig } from "@chakra-ui/react";

    const colors = {
      brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
      },
    };

    const config: ThemeConfig = {
      initialColorMode: "light",
      useSystemColorMode: false,
    };

    export const theme = extendTheme({ colors, config });
  `
  } else if (flags["material-ui"]) {
    return endent/* tsx */ `
    import { createTheme } from '@material-ui/core/styles';
    import { red } from '@material-ui/core/colors';

    export const theme = createTheme({
      palette: {
        primary: {
          main: '#556cd6',
        },
        secondary: {
          main: '#19857b',
        },
        error: {
          main: red.A400,
        },
        background: {
          default: '#fff',
        },
      },
    });
    `
  } else {
    return ""
  }
}
