import React from "react"
import { render } from "react-dom"
import { Button, Divider, Paper, Typography } from "@mui/material"
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
          padding: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          sx={{ opacity: 0.5 }}
        >
          Clean Bookmarks
        </Typography>

        <Typography
          gutterBottom
          variant="body2"
          sx={{
            opacity: 0.5,
            fontSize: 12,
            marginBottom: 2,
          }}
        >
          Moves dead bookmarks (e.g. non-existant pages) to a folder called
          "Trash" for you to review. No bookmarks will be deleted.
        </Typography>

        <Button onClick={handleClean} variant="contained" sx={{ color: "white" }} fullWidth>
          Clean bookmarks (Instant)
        </Button>

        <Divider sx={{ margin: 2 }} />

        <Typography
          gutterBottom
          variant="h6"
          sx={{ opacity: 0.5 }}
        >
          Refresh Bookmarks
        </Typography>

        <Typography
          gutterBottom
          variant="body2"
          sx={{
            opacity: 0.5,
            fontSize: 12,
          }}
        >
          Updates bookmark titles and favicons. All pages will be
          slowly opened and closed, so can take up to two minutes.
        </Typography>

        <Typography
          gutterBottom
          variant="body2"
          sx={{
            opacity: 0.5,
            fontSize: 12,
            marginBottom: 2,
          }}
        >
          Please don't use the browser while the refresh is running.
        </Typography>

        <Button onClick={handleRefresh} variant="contained" sx={{ color: "white" }} fullWidth>
          Refresh bookmarks (Slow)
        </Button>
      </Paper>
    </ThemeProvider>
  )
}

render(<Popup />, document.getElementById("root"))
