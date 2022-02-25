import React, { useState } from "react"
import { Slider, Typography } from "@mui/material"
import Description from "../../components/description/Description"

function BatchSizeSection(): JSX.Element {
  const [batchSize, setBatchSize] = useState(2)

  const handleBatchSizeChange = (updatedSize: number | number[]): void => {
    if (updatedSize instanceof Array) {
      setBatchSize(updatedSize[0])
    } else {
      setBatchSize(updatedSize)
    }

    chrome.runtime.sendMessage({
      topic: "UpdatedBatchSize",
      value: updatedSize,
    })
  }

  return (
    <>
      <Typography>
        Batch size
      </Typography>

      <Description>
        Number of pages to open while refreshing.
        Reduce the batch size for less powerful computers.
      </Description>

      <Slider
        marks
        min={1}
        max={5}
        step={1}
        defaultValue={batchSize}
        valueLabelDisplay="auto"
        onChangeCommitted={(_, value) => handleBatchSizeChange(value)}
      />
    </>
  )
}

export default BatchSizeSection
