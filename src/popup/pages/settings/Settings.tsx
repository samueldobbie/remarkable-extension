import React from "react"
import { Box } from "@mui/system"
import SectionDivider from "../../components/section-divider/SectionDivider"
import OptionSection from "./OptionSection"
import BatchSizeSection from "./BatchSizeSection"
import Page from "../../commons/Page"

interface Props {
  setActivePage: (page: Page) => void
}

function Settings(props: Props): JSX.Element {
  const { setActivePage } = props

  return (
    <>
      <Box>
        <BatchSizeSection />
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

export default Settings
