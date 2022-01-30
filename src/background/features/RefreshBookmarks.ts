import getValidBookmarks from "../commons/Bookmarks"
import IBookmark from "../commons/IBookmark"

const refreshBookmarks = () => {
  chrome.bookmarks.search({}, (bookmarks) => {
    const validBookmarks = getValidBookmarks(bookmarks)
    const batchedBookmarks = getBatchedBookmarks(validBookmarks, 5)

    const interval = setInterval(() => {
      if (batchedBookmarks.length === 0) {
        clearInterval(interval)
        return
      }

      const batch = batchedBookmarks.shift()

      if (batch) {
        refreshFaviconBatch(batch)
      }
    }, 1500)
  })
}

const getBatchedBookmarks = (bookmarks: IBookmark[], batchSize: number) => {
  const batches = [] as IBookmark[][]

  for (let i = 0; i < bookmarks.length; i += batchSize) {
    const batch = bookmarks.slice(i, i + batchSize)
    batches.push(batch)
  }

  return batches
}

const refreshFaviconBatch = (batch: IBookmark[]) => {
  batch.forEach((bookmark) => {
    const { url } = bookmark

    chrome.tabs.create({ url }, (tab) => {
      const tabId = tab.id

      if (tabId) {
        chrome.tabs.onUpdated.addListener((updatedTabId, changeInfo) => {
          const isSameTab = updatedTabId === tabId
          const isReady = changeInfo.status === "complete"

          if (isSameTab && isReady) {
            setTimeout(() => {
              chrome.tabs.remove(tabId)
            }, 1500)
          }
        })
      }
    })
  })
}

export default refreshBookmarks
