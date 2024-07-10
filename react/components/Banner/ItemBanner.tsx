import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useNewtailMedia } from '../../hooks/useNewtailMedia'
import { useOnView } from '../../hooks/useOnView'

// import { Container } from './styles';

const ItemBanner = ({ data }: { data: BannerAd }) => {
  const [imageSize, setImageSize] = useState<{
    width: number | string
    height: number | string
  }>({
    height: 'auto',
    width: 'auto',
  })

  useEffect(() => {
    if (!data.media_url) return
    const img = new Image()

    img.src = data.media_url
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height })
    }
  }, [data.media_url])

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

  const ImageHTML = () => (
    <>
      <style>
        {`
          .newtail-media-banner__image {
            max-width: ${imageSize.width}px;
            max-height: ${imageSize.height}px;
            margin: auto;
          }
        `}
      </style>
      <img
        src={data.media_url}
        alt="Banner"
        className="newtail-media-banner__image"
        width={imageSize.width}
        height={imageSize.height}
      />
    </>
  )

  return (
    <div ref={bannerRef}>
      {data.destination_url ? (
        <a href={data.destination_url} onClick={handleClick}>
          <ImageHTML />
        </a>
      ) : (
        <ImageHTML />
      )}
    </div>
  )
}

export default ItemBanner
