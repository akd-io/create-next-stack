"use client"

import {
  Anchor as MantineAnchor,
  AnchorProps as MantineAnchorProps,
  PolymorphicComponentProps,
} from "@mantine/core"

type AnchorProps = PolymorphicComponentProps<"a", MantineAnchorProps>
export const Anchor = (props: AnchorProps) => {
  return <MantineAnchor c="#319bff" fw="bold" {...props} />
}
