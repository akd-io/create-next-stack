"use client"

import { Radio as MantineRadio } from "@mantine/core"
import type { RadioProps } from "@mantine/core"

export const Radio = (props: RadioProps) => {
  return <MantineRadio size="md" color="violet" {...props} />
}
