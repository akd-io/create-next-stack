"use client"

import { Radio as MantineRadio, RadioProps } from "@mantine/core"
import { FC } from "react"

export const Radio: FC<RadioProps> = (props) => {
  return <MantineRadio size="md" color="violet" {...props} />
}
