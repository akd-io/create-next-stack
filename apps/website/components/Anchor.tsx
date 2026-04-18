"use client"

import {
  Anchor as MantineAnchor,
  AnchorProps as MantineAnchorProps,
  polymorphic,
} from "@mantine/core"

export const Anchor = polymorphic<"a", MantineAnchorProps>(
  (props: MantineAnchorProps) => {
    return <MantineAnchor c="#319bff" fw="bold" {...props} />
  },
)
