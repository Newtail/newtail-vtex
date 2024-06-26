import React from 'react'
import { canUseDOM } from 'vtex.render-runtime'

import { useNewtailMediaSearch } from '../../hooks/useNewtailMediaSearch'

function Search() {
  const { handleEvents } = useNewtailMediaSearch()

  if (canUseDOM) {
    window.addEventListener('message', handleEvents)
  }

  return <></>
}

export default Search
