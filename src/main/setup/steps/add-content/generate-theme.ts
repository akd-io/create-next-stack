import endent from "endent"
import type { ValidCNSInputs } from "../../../create-next-stack-types"
import { writeFile } from "../../../helpers/io"

const chakraUITheme = endent/* tsx */ `
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

    export const chakraTheme = extendTheme({ colors, config });
  `

const materialUITheme = endent/* tsx */ `
    import { createTheme } from '@material-ui/core/styles';
    import { red } from '@material-ui/core/colors';

    export const materialTheme = createTheme({
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

export const generateTheme = ({ flags }: ValidCNSInputs): Promise<void>[] => {
  const promises: Promise<void>[] = []

  if (flags.chakra) {
    promises.push(writeFile("chakra-theme.ts", chakraUITheme))
  }

  if (flags["material-ui"]) {
    promises.push(writeFile("material-theme.ts", materialUITheme))
  }

  return promises
}
