"use client"

import { Flex, Tooltip } from "@mantine/core"
import { ReactNode } from "react"
import { FiInfo } from "react-icons/fi"

type WithInfoIconAndTooltipProps = {
  tooltip: string
  children: ReactNode
}
export const WithInfoIconAndTooltip = ({
  tooltip,
  children,
}: WithInfoIconAndTooltipProps) => {
  return (
    <Tooltip position="top" label={tooltip} withArrow>
      <Flex display="inline-flex" direction="row" gap="6px" align="center">
        {children}
        <FiInfo size="16px" />
      </Flex>
    </Tooltip>
  )
}
