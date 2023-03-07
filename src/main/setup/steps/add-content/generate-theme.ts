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
  import { Roboto } from 'next/font/google';
  import { createTheme } from '@mui/material/styles';
  import { red } from '@mui/material/colors';

  export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
  });

  // Create a theme instance.
  export default createTheme({
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
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
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
