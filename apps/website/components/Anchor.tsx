"use client"

import { Anchor as MantineAnchor, polymorphic } from "@mantine/core"
import type { AnchorProps as MantineAnchorProps } from "@mantine/core"

export const Anchor = polymorphic<"a", MantineAnchorProps>(
  (props: MantineAnchorProps) => {
    return <MantineAnchor c="#319bff" fw="bold" {...props} />
  },
)
