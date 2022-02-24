import { Divider } from "@mui/material"
import React from "react"
import CleanSection from "./CleanSection"
import RefreshSection from "./RefreshSection"
import OptionsSection from "./OptionsSection"

interface Props {
  setActivePage: (page: string) => void
}

function Actions(props: Props): JSX.Element {
  const { setActivePage } = props

  const dividerStyles = {
    margin: 2,
  }

  return (
    <>
      <CleanSection />
      <Divider sx={dividerStyles} />
      <RefreshSection />
      <Divider sx={dividerStyles} />
      <OptionsSection
        setActivePage={setActivePage}
      />
    </>
  )
}

export default Actions
