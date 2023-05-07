import { css, Global } from "@emotion/react"
import React from "react"

const globalStyles = css`
  // No global styles
`

type WithDefaultGlobalStylesProps = {
  children?: React.ReactNode
}
const WithDefaultGlobalStyles: React.FC<WithDefaultGlobalStylesProps> = ({
  children,
}) => {
  return (
    <>
      <Global styles={globalStyles} />
      {children}
    </>
  )
}

export default WithDefaultGlobalStyles
