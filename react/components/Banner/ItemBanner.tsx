import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import { useNewtailMedia } from '../../hooks/useNewtailMedia'
import { useOnView } from '../../hooks/useOnView'

// import { Container } from './styles';

const ItemBanner = ({ data }: { data: BannerAd }) => {
  const bannerRef = useRef<HTMLDivElement | null>(null)

  const { handleEvents } = useNewtailMedia()

  const adId = useMemo(
    () => data.ad_id || null,

    [data]
  )

  const handleImpression = useCallback(() => {
    if (adId) {
      handleEvents({ type: 'banner', event: 'impression', adId })
    }
  }, [handleEvents, adId])

  const onView = useCallback(() => {
    if (adId) {
      handleEvents({ type: 'banner', event: 'view', adId })
    }
  }, [handleEvents, adId])

  const handleClick = useCallback(() => {
    if (adId) {
      handleEvents({ type: 'banner', event: 'click', adId })
    }
  }, [handleEvents, adId])

  useOnView({
    ref: bannerRef,
    onView,
    once: true,
    initializeOnInteraction: true,
  })

  useEffect(() => {
    handleImpression()
  }, [handleImpression])

  return (
    <>
      {data.destination_url ? (
        <div ref={bannerRef}>
          <a href={data.destination_url} onClick={handleClick}>
            <img
              src={data.media_url}
              alt="Banner"
              className="newtail-media-banner__image"
            />
          </a>
        </div>
      ) : (
        <div ref={bannerRef}>
          <img
            src={data.media_url}
            alt="Banner"
            className="newtail-media-banner__image"
          />
        </div>
      )}
    </>
  )
}

export default ItemBanner
