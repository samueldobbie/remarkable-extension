import { Box } from "@mui/material"
import React from "react"
import CleanSection from "./CleanSection"
import RefreshSection from "./RefreshSection"
import OptionSection from "./OptionSection"
import SectionDivider from "../../components/section-divider/SectionDivider"

interface Props {
  setActivePage: (page: string) => void
}

function Actions(props: Props): JSX.Element {
  const { setActivePage } = props

  return (
    <>
      <Box>
        <CleanSection />
      </Box>

      <SectionDivider />

      <Box>
        <RefreshSection />
      </Box>

      <SectionDivider />

      <Box>
        <OptionSection
          setActivePage={setActivePage}
        />
      </Box>
    </>
  )
}

export default Actions
