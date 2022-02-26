import React, { useEffect, useState } from "react"
import { Slider, Typography } from "@mui/material"
import Description from "../../components/description/Description"
import Storage from "../../../commons/Storage"

function BatchDurationSection(): JSX.Element {
  const [batchDuration, setBatchDuration] = useState(6)

  useEffect(() => {
    chrome.storage.sync.get(Storage.BatchDuration, (stored) =>{
      if (stored.batchDuration) {
        setBatchDuration(stored.batchDuration)
      }
    })
  }, [])

  const handleChange = (value: number | number[]): void => {
    const updatedBatchDuration = value instanceof Array
      ? value[0]
      : value

    setBatchDuration(updatedBatchDuration)
  }

  const handleChangeCommitted = (value: number | number[]): void => {
    const updatedBatchDuration = value instanceof Array
      ? value[0]
      : value

    chrome.storage.sync.set({
      [Storage.BatchDuration]: updatedBatchDuration,
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
        value={batchDuration}
        valueLabelDisplay="auto"
        onChange={(_, value) => handleChange(value)}
        onChangeCommitted={(_, value) => handleChangeCommitted(value)}
      />
    </>
  )
}

export default BatchDurationSection
