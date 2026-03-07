"use client"

import { createTheme } from "@mantine/core"

export const theme = createTheme({
  primaryColor: "violet",
  fontFamily: '"Inter", sans-serif',
  headings: {
    fontFamily: '"Inter", sans-serif',
  },
  other: {
    fontFamilyMono: '"Roboto Mono", monospace',
    brandGradient: { from: "#6838F1", to: "#DC51F2", deg: 135 },
  },
})
