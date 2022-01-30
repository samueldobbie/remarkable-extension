import { Typography } from "@mui/material"
import React from "react"

function Header({children}: any): JSX.Element {
  return (
    <Typography
      gutterBottom
      variant="h6"
      sx={{ opacity: 0.5 }}
    >
      {children}
    </Typography>
  )
}

export default Header
