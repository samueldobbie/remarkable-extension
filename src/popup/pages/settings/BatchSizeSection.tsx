import React, { useEffect, useState } from "react"
import { Slider, Typography } from "@mui/material"
import Description from "../../components/description/Description"
import BatchSize from "../../../commons/BatchSize"

function BatchSizeSection(): JSX.Element {
  const [batchSize, setBatchSize] = useState(BatchSize.Default as number)

  const storageKey = BatchSize.StorageKey

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
      [storageKey]: updatedBatchSize,
    })
  }

  useEffect(() => {
    chrome.storage.sync.get(storageKey, (stored) => {
      if (stored[storageKey]) {
        setBatchSize(stored[storageKey])
      }
    })
  }, [])

  return (
    <>
      <Typography>
        Batch size
      </Typography>

      <Description>
        The maximum number of pages to open at any one time during a refresh.
        Reduce the batch size for less powerful machines.
      </Description>

      <Slider
        marks
        min={1}
        max={15}
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
