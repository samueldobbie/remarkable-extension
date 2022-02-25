import React, { useState } from "react"
import { Slider, Typography } from "@mui/material"
import Description from "../../components/description/Description"

function BatchDurationSection(): JSX.Element {
  const [batchDuration, setBatchDuration] = useState(6)

  const handleBatchDurationChange = (updatedDuration: number | number[]): void => {
    if (updatedDuration instanceof Array) {
      setBatchDuration(updatedDuration[0])
    } else {
      setBatchDuration(updatedDuration)
    }

    chrome.runtime.sendMessage({
      topic: "UpdatedBatchDuration",
      value: updatedDuration,
    })
  }

  return (
    <>
      <Typography>
        Batch duration
      </Typography>

      <Description>
        Number of seconds to wait between opening each batch of URLs during refresh.
        Increase the batch duration for less powerful computers.
      </Description>

      <Slider
        marks
        min={1}
        max={10}
        step={1}
        defaultValue={batchDuration}
        valueLabelDisplay="auto"
        onChangeCommitted={(_, value) => handleBatchDurationChange(value)}
      />
    </>
  )
}

export default BatchDurationSection
