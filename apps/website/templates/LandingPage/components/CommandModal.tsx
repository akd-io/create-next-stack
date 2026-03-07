"use client"

import { Button, Code, Flex, Modal, Text } from "@mantine/core"
import { FC, useEffect, useState } from "react"
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

  useEffect(() => {
    setHasCopied(false)
  }, [opened])

  const [copyFailed, setCopyFailed] = useState(false)

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setHasCopied(true)
    } catch {
      setCopyFailed(true)
    }
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Almost there...">
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
