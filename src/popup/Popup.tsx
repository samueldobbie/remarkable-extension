import React from "react"
import { render } from "react-dom"
import { Button, Paper, Typography } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../commons/Theme"

function Popup(): JSX.Element {
  const handleRefresh = (): void => {
    chrome.runtime.sendMessage({ topic: "RefreshBookmarks" })
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          height: "100%",
          textAlign: "center",
          padding: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="body2"
          sx={{
            opacity: 0.5,
          }}
        >
          Refresh your bookmarks to update
          the titles and favicons. Dead bookmarks
          will be moved to a bookmark folder
          called "Trash" for your review.
        </Typography>

        <Button onClick={handleRefresh}>
          Refresh bookmarks
        </Button>
      </Paper>
    </ThemeProvider>
  )
}

render(<Popup />, document.getElementById("root"))
