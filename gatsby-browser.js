exports.onRouteUpdate = () => {
  setTimeout(() => {
    if (
      typeof twttr !== 'undefined' &&
      window.twttr.widgets &&
      typeof window.twttr.widgets.load === 'function'
    ) {
      window.twttr.widgets.load()
    }
  }, 200)
}

exports.onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}
