import React, { useState } from "react"
import { Slider, Typography } from "@mui/material"
import Description from "../../components/description/Description"
import Topic from "../../../commons/Topic"

function BatchDurationSection(): JSX.Element {
  const [batchDuration, setBatchDuration] = useState(6)

  const handleBatchDurationChange = (value: number | number[]): void => {
    const updatedBatchDuration = value instanceof Array
      ? value[0]
      : value

    chrome.runtime.sendMessage({
      topic: Topic.UpdatedBatchDuration,
      value: updatedBatchDuration,
    })

    setBatchDuration(updatedBatchDuration)
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
