import { Typography } from "@mui/material"
import React from "react"

function Description({children}: any): JSX.Element {
  const styles = {
    opacity: 0.5,
    fontSize: 12,
    mb: 2,
  }

  return (
    <Typography
      gutterBottom
      variant="body2"
      sx={styles}
    >
      {children}
    </Typography>
  )
}

export default Description
