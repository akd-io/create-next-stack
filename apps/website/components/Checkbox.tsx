"use client"

import { Checkbox as MantineCheckbox, CheckboxProps } from "@mantine/core"
import { FC } from "react"

export const Checkbox: FC<CheckboxProps> = (props) => {
  return <MantineCheckbox size="md" color="violet" {...props} />
}
