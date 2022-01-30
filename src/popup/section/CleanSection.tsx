import React, { useState } from "react"
import ActionButton from "../components/action-button/ActionButton"
import Description from "../components/description/Description"
import Header from "../components/header/Header"

function CleanBookmarkSection(): JSX.Element {
  const [actionText, setActionText] = useState("Run clean (Instant)")

  const handleClean = (): void => {
    setActionText("Cleaned!")
    chrome.runtime.sendMessage({ topic: "CleanBookmarks" })
  }

  return (
    <>
      <Header>
        Clean bookmarks
      </Header>

      <Description>
        Moves dead bookmarks (e.g. non-existent pages) to a folder called
        "Trash" for you to review. No bookmarks will be deleted.
      </Description>

      <ActionButton
        handleClick={handleClean}
        text={actionText}
      />
    </>
  )
}

export default CleanBookmarkSection
