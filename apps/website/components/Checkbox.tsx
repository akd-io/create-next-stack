"use client"

import { Checkbox as MantineCheckbox } from "@mantine/core"
import type { CheckboxProps } from "@mantine/core"

export const Checkbox = (props: CheckboxProps) => {
  return <MantineCheckbox size="md" color="violet" {...props} />
}
