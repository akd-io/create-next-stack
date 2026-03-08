"use client"

import { Anchor as MantineAnchor } from "@mantine/core"
import { ReactNode } from "react"

type AnchorProps = {
  href?: string
  target?: string
  children?: ReactNode
  c?: string
  fw?: string | number
}

export const Anchor = ({
  c = "#319bff",
  fw = "bold",
  ...props
}: AnchorProps) => {
  return <MantineAnchor c={c} fw={fw} {...props} />
}
