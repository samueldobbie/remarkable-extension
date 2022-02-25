import React from "react"
import { Button } from "@mui/material"

interface Props {
  setActivePage: (page: string) => void
}

function OptionSection(props: Props): JSX.Element {
  const { setActivePage } = props

  const handleMoveToActions = () => {
    setActivePage("actions")
  }

  return (
    <Button onClick={handleMoveToActions}>
      Exit settings
    </Button>
  )
}

export default OptionSection
