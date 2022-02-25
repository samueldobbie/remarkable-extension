import { Typography } from "@mui/material"
import React from "react"

function Header({children}: any): JSX.Element {
  const styles = {
    opacity: 0.5,
  }

  return (
    <Typography
      gutterBottom
      variant="h6"
      sx={styles}
    >
      {children}
    </Typography>
  )
}

export default Header
