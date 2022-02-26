import Description from "../../components/description/Description"
import React, { useEffect, useRef, useState } from "react"
import ActionButton from "../../components/action-button/ActionButton"
import Header from "../../components/header/Header"
import Topic from "../../../commons/Topic"

function RefreshSection(): JSX.Element {
  const [actionText, setActionText] = useState("Run refresh (Slow)")

  const isClosed = useRef(false)

  const handleRefresh = (): void => {
    setActionText("Refreshing...")

    chrome.runtime.sendMessage({
      topic: Topic.RefreshBookmarks,
    })
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request) => {
      const refreshCompleted = request.topic === Topic.CompletedRefresh
      const popupOpen = !isClosed.current

      if (refreshCompleted && popupOpen) {
        setActionText("Refreshed!")
      }
    })

    return () => {
      isClosed.current = true
    }
  }, [])

  return (
    <>
      <Header>
        Refresh bookmarks
      </Header>

      <Description>
        Refreshes your bookmark favicons. All pages will be
        slowly opened and closed in batches, so can take some time.
        You can configure the batch size in the settings.
      </Description>

      <ActionButton
        handleClick={handleRefresh}
        text={actionText}
      />
    </>
  )
}

export default RefreshSection
