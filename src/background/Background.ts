chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.topic === "RefreshBookmarks") {
    chrome.bookmarks.search({ title: "Trash" }, (results) => {
      if (results.length === 0) {
        chrome.bookmarks.create({
          title: "Trash",
          parentId: "1",
        }, (trash) => {
          refreshBookmarks(trash.id)
        })
      } else {
        const trashId = results[0].id
        refreshBookmarks(trashId)
      }
      // sendResponse({});
    })
  }
})

const refreshBookmarks = (trashId: string) => {
  chrome.bookmarks.search({}, (bookmarks) => {
    bookmarks.forEach((bookmark) => {
      const { id, url } = bookmark

      if (url) {
        fetch(url, {
          method: "HEAD",
          mode: "no-cors",
        })
          .then((response) => {
            if (response.status === 404) {
              chrome.bookmarks.move(id, {
                parentId: trashId
              })
            }
          })
          .catch(() => {
            chrome.bookmarks.move(id, {
              parentId: trashId
            })
          })
      }
    })
  })
}
