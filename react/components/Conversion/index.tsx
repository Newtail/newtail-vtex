import React, { useCallback } from 'react'
import { canUseDOM } from 'vtex.render-runtime'

import { useNewtailMedia } from '../../hooks/useNewtailMedia'

const Conversion: React.FC = () => {
  const { handleConversion } = useNewtailMedia()

  const handleEvents = useCallback(
    (event: VtexEvent) => {
      const { data } = event

      if (data.eventName === 'vtex:orderPlaced') {
        handleConversion(data)
      }
    },
    [handleConversion]
  )

  if (canUseDOM) {
    window.addEventListener('message', handleEvents)
  }

  return <></>
}

export default Conversion
