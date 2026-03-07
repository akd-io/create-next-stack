"use client"

import { Button, Code, Flex, Modal, Text } from "@mantine/core"
import { FC, useState } from "react"
import { FiCheck } from "react-icons/fi"

type CommandModalProps = {
  opened: boolean
  command: string
  onClose: () => void
}
export const CommandModal: FC<CommandModalProps> = ({
  command,
  opened,
  onClose,
}) => {
  const [hasCopied, setHasCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)

  const handleClose = () => {
    setHasCopied(false)
    setCopyFailed(false)
    onClose()
  }

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setHasCopied(true)
    } catch {
      setCopyFailed(true)
    }
  }

  return (
    <Modal opened={opened} onClose={handleClose} title="Almost there...">
      <Flex direction="column" gap="16">
        <Text>Run the following command in your terminal:</Text>
        <Code p="16" bg="gray.1" block>
          {command}
        </Code>
        {!copyFailed && (
          <Button color="violet" fullWidth onClick={handleCopyClick}>
            {hasCopied ? <FiCheck /> : <>Copy</>}
          </Button>
        )}
        {copyFailed && (
          <Text c="red.5" fz="sm">
            Failed to copy to clipboard. You will need to copy it manually.
          </Text>
        )}
      </Flex>
    </Modal>
  )
}
