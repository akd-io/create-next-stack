"use client"

import { CheckboxProps, Checkbox as MantineCheckbox } from "@mantine/core"

export const Checkbox = (props: CheckboxProps) => {
  return <MantineCheckbox size="md" color="violet" {...props} />
}
