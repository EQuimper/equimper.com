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
