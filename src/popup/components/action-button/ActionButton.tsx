import { Button } from "@mui/material"
import React from "react"

interface IProps {
  handleClick: () => void
  text: string
}

function ActionButton(props: IProps): JSX.Element {
  const { handleClick, text } = props

  const styles = {
    color: "white",
  }

  return (
    <Button
      fullWidth
      onClick={handleClick}
      variant="contained"
      sx={styles}
    >
      {text}
    </Button>
  )
}

export default ActionButton
