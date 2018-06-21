export default dispatch => () => {
  if (global !== undefined && global.location !== undefined) {
    const hash = global.location.hash.slice(1)

    if (hash !== 'undefined' && hash !== '') {
      dispatch({
        type: 'FROM_HASH',
        payload: decodeURIComponent(hash),
      })
    } else {
      dispatch({
        type: 'INITIALIZE',
      })
    }
  }
}
