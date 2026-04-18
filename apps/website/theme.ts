"use client"

import { createTheme } from "@mantine/core"

export const theme = createTheme({
  primaryColor: "violet",
  fontFamily: '"Inter", sans-serif',
  headings: {
    fontFamily: '"Inter", sans-serif',
  },
  defaultGradient: { from: "#6838F1", to: "#DC51F2", deg: 135 },
  other: {
    fontFamilyMono: '"Roboto Mono", monospace',
  },
})
