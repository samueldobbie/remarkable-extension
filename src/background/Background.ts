type Trash = chrome.bookmarks.BookmarkTreeNode

const trashFolder = {
  title: "Trash",
  parentId: "1",
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.topic === "RefreshBookmarks") {
    chrome.bookmarks.search({ title: trashFolder.title }, (results) => {
      const trashFolderExists = results.length > 0

      if (trashFolderExists) {
        const trash = results[0]
        refreshBookmarks(trash)
      } else {
        chrome.bookmarks.create(
          trashFolder,
          refreshBookmarks,
        )
      }
    })
  }
})

const refreshBookmarks = (trash: Trash) => {
  chrome.bookmarks.search({}, (bookmarks) => {
    const validBookmarks = getValidBookmarks(bookmarks)
    const batchedBookmarks = getBatchedBookmarks(validBookmarks, 10)

    // call refreshBatch for each batch using promises
    Promise.all(batchedBookmarks.map((batch) => {
      return refreshBatch(batch, trash)
    })).then(() => {
      


  })
}

const refreshBatch = (bookmarks: { id: string; url: string }[], trash: Trash) => {
  bookmarks.forEach((bookmark) => {
    const { id, url } = bookmark

    fetch(url, {
      method: "HEAD",
      mode: "no-cors",
    })
      .then((response) => {
        if (response.status === 404) {
          moveToTrash(id, trash.id)
        } else {
          refreshFavicon(url)
        }
      })
      .catch(() => {
        moveToTrash(id, trash.id)
      })
  })
}

const getValidBookmarks = (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => {
  const validBookmarks = [] as { id: string; url: string }[]

  bookmarks.forEach((bookmark) => {
    const { id, url } = bookmark

    if (url) {
      validBookmarks.push({ id, url })
    }
  })

  return validBookmarks
}

const getBatchedBookmarks = (bookmarks: { id: string; url: string }[], batchSize: number) => {
  const batches = [] as { id: string; url: string }[][]

  for (let i = 0; i < bookmarks.length; i += batchSize) {
    batches.push(bookmarks.slice(i, i + batchSize))
  }

  return batches
}

const moveToTrash = (bookmarkId: string, trashId: string) => {
  chrome.bookmarks.move(bookmarkId, { parentId: trashId })
}

const refreshFavicon = (url: string) => {
  chrome.tabs.create({ url }, (tab) => {
    const tabId = tab.id

    if (tabId) {
      chrome.tabs.onUpdated.addListener((updatedTabId, changeInfo) => {
        const isSameTab = updatedTabId === tabId
        const isReady = changeInfo.status === "complete"

        if (isSameTab && isReady) {
          setTimeout(() => {
            chrome.tabs.remove(tabId)
          }, 2500)
        }
      })
    }
  })
}
