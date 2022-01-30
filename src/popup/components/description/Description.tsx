import { Typography } from "@mui/material"
import React from "react"

function Description({children}: any): JSX.Element {
  return (
    <Typography
      gutterBottom
      variant="body2"
      sx={{
        opacity: 0.5,
        fontSize: 12,
        marginBottom: 2,
      }}
    >
      {children}
    </Typography>
  )
}

export default Description
