import { InfoOutlineIcon } from "@chakra-ui/icons"
import { Flex, Tooltip } from "@chakra-ui/react"
import { FC } from "react"

type WithInfoIconAndTooltipProps = {
  tooltip: string
  children: React.ReactNode
}
export const WithInfoIconAndTooltip: FC<WithInfoIconAndTooltipProps> = ({
  tooltip,
  children,
}) => {
  return (
    <Tooltip placement="top" label={tooltip} hasArrow shouldWrapChildren>
      <Flex display={"inline-flex"} direction="row" gap="6px">
        {children}
        <InfoOutlineIcon w={"16px"} h={"16px"} alignSelf="center" />
      </Flex>
    </Tooltip>
  )
}
