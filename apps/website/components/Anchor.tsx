"use client"

import {
  Anchor as MantineAnchor,
  AnchorProps as MantineAnchorProps,
  PolymorphicComponentProps,
} from "@mantine/core"

type AnchorProps = PolymorphicComponentProps<"a", MantineAnchorProps>
export const Anchor = ({
  c = "#319bff",
  fw = "bold",
  ...props
}: AnchorProps) => {
  return <MantineAnchor c={c} fw={fw} {...props} />
}
