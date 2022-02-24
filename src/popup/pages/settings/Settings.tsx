import React from "react"
import { Slider, Typography } from "@mui/material"
import Description from "../../components/description/Description"

interface Props {
  setActivePage: (page: string) => void
}

function Settings(props: Props): JSX.Element {
  const { setActivePage } = props

  return (
    <>
      <Typography>
        Batch size
      </Typography>

      <Description>
        Number of pages to open while refreshing.
        Use lower values for less powerful computers.
      </Description>

      <Slider
        marks
        min={1}
        max={5}
        step={1}
        defaultValue={2}
        valueLabelDisplay="auto"
      />

      <Typography>
        Batch duration (seconds)
      </Typography>

      <Description>
        Duration to wait between opening each batch of URLs during refresh.
        Use higher values for less powerful computers.
      </Description>

      <Slider
        marks
        min={1}
        max={10}
        step={1}
        defaultValue={6}
        valueLabelDisplay="auto"
      />
    </>
  )
}

export default Settings
