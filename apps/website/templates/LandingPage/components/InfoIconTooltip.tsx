"use client"

import { Flex, Tooltip } from "@mantine/core"
import { FC } from "react"
import { FiInfo } from "react-icons/fi"

type WithInfoIconAndTooltipProps = {
  tooltip: string
  children: React.ReactNode
}
export const WithInfoIconAndTooltip: FC<WithInfoIconAndTooltipProps> = ({
  tooltip,
  children,
}) => {
  return (
    <Tooltip position="top" label={tooltip} withArrow>
      <Flex display="inline-flex" direction="row" gap="6px" align="center">
        {children}
        <FiInfo size="16px" />
      </Flex>
    </Tooltip>
  )
}
