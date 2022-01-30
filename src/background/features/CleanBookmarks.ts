import getValidBookmarks from "../commons/Bookmarks"

type Trash = chrome.bookmarks.BookmarkTreeNode

const trashFolder = {
  parentId: "1",
  title: "Trash",
}

const cleanBookmarks = () => {
  chrome.bookmarks.search({ title: trashFolder.title }, (trashFolders) => {
    const trashFolderExists = trashFolders.length > 0

    if (trashFolderExists) {
      const trash = trashFolders[0]
      checkBookmarkStatus(trash)
    } else {
      chrome.bookmarks.create(
        trashFolder,
        checkBookmarkStatus,
      )
    }
  })
}

const checkBookmarkStatus = (trash: Trash) => {
  chrome.bookmarks.search({}, (bookmarks) => {
    const validBookmarks = getValidBookmarks(bookmarks)

    validBookmarks.forEach((bookmark) => {
      const { id, url } = bookmark
      
      fetch(url, {
        method: "HEAD",
        mode: "no-cors",
      })
        .then((response) => {
          const isDeadBookmark =
            response.status == 400

          if (isDeadBookmark) {
            moveToTrash(id, trash.id)
          }
        })
        .catch(() => {
          moveToTrash(id, trash.id)
        })
    })
  })
}

const moveToTrash = (bookmarkId: string, trashId: string) => {
  chrome.bookmarks.move(bookmarkId, { parentId: trashId })
}

export default cleanBookmarks
