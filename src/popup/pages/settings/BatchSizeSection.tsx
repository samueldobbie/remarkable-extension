import React, { useState } from "react"
import { Slider, Typography } from "@mui/material"
import Description from "../../components/description/Description"
import Topic from "../../../commons/Topic"

function BatchSizeSection(): JSX.Element {
  const [batchSize, setBatchSize] = useState(2)

  const handleBatchSizeChange = (value: number | number[]): void => {
    const updatedBatchSize = value instanceof Array
      ? value[0]
      : value

    chrome.runtime.sendMessage({
      topic: Topic.UpdatedBatchSize,
      value: updatedBatchSize,
    })

    setBatchSize(updatedBatchSize)
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
