"use client"

import { Flex, Tooltip } from "@mantine/core"
import { ReactNode, useRef, useState } from "react"
import { FiInfo } from "react-icons/fi"

type WithInfoIconAndTooltipProps = {
  tooltip: string
  children: ReactNode
}
export const WithInfoIconAndTooltip = ({
  tooltip,
  children,
}: WithInfoIconAndTooltipProps) => {
  const iconRef = useRef<HTMLSpanElement>(null)
  const [opened, setOpened] = useState(false)
  return (
    <Flex
      display="inline-flex"
      direction="row"
      gap="6px"
      align="center"
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}
    >
      {children}
      <span ref={iconRef} style={{ display: "inline-flex" }}>
        <FiInfo size="16px" />
      </span>
      <Tooltip
        target={iconRef}
        label={tooltip}
        opened={opened}
        position="top"
        withArrow
      />
    </Flex>
  )
}
