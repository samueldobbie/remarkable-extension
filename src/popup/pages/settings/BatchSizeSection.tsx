import React, { useEffect, useState } from "react"
import { Slider, Typography } from "@mui/material"
import Description from "../../components/description/Description"
import Storage from "../../../commons/Storage"

function BatchSizeSection(): JSX.Element {
  const [batchSize, setBatchSize] = useState(2)

  useEffect(() => {
    chrome.storage.sync.get(Storage.BatchSize, (stored) =>{
      if (stored.batchSize) {
        setBatchSize(stored.batchSize)
      }
    })
  }, [])

  const handleChange = (value: number | number[]): void => {
    const updatedBatchSize = value instanceof Array
      ? value[0]
      : value

    setBatchSize(updatedBatchSize)
  }

  const handleChangeCommitted = (value: number | number[]): void => {
    const updatedBatchSize = value instanceof Array
      ? value[0]
      : value

    chrome.storage.sync.set({
      [Storage.BatchSize]: updatedBatchSize,
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
        value={batchSize}
        valueLabelDisplay="auto"
        onChange={(_, value) => handleChange(value)}
        onChangeCommitted={(_, value) => handleChangeCommitted(value)}
      />
    </>
  )
}

export default BatchSizeSection
