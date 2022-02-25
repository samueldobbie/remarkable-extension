import React from "react"
import { Button } from "@mui/material"
import Page from "../../commons/Page"

interface Props {
  setActivePage: (page: Page) => void
}

function OptionSection(props: Props): JSX.Element {
  const { setActivePage } = props

  const handleMoveToHome = () => {
    setActivePage(Page.Home)
  }

  return (
    <Button onClick={handleMoveToHome}>
      Exit settings
    </Button>
  )
}

export default OptionSection
