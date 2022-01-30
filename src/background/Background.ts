import cleanBookmarks from "./features/CleanBookmarks"
import refreshBookmarks from "./features/RefreshBookmarks"

chrome.runtime.onMessage.addListener((request) => {
  if (request.topic === "CleanBookmarks") {
    cleanBookmarks()
  } else if (request.topic === "RefreshBookmarks") {
    refreshBookmarks()
  }
})
