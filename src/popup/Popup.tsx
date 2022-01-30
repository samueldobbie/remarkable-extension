import React from "react"
import { render } from "react-dom"
import { Button, Paper, Typography } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../commons/Theme"

function Popup(): JSX.Element {
  const handleClean = (): void => {
    chrome.runtime.sendMessage({ topic: "CleanBookmarks" })
  }

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
          sx={{ opacity: 0.5 }}
        >
          Periodically run a clean to move dead
          bookmarks to a bookmark folder called
          "Trash" for your review.

          Occasionally run a refresh to update
          the titles and favicons of your bookmarks.
          During the refresh all of your bookmarks
          will be automatically opened and closeed
          (in small batches), so may take a couple
          of minutes.
        </Typography>

        <Button onClick={handleClean}>
          Clean bookmarks (Instant)
        </Button>

        <Button onClick={handleRefresh}>
          Refresh bookmarks (Slow)
        </Button>
      </Paper>
    </ThemeProvider>
  )
}

render(<Popup />, document.getElementById("root"))
