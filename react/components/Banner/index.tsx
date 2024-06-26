import React from 'react'

import { useNewtailMedia } from '../../hooks/useNewtailMedia'
import ItemBanner from './ItemBanner'

interface Props {
  title?: string
}

function Banners({ title }: Props) {
  const { banners } = useNewtailMedia()

  return banners?.length ? (
    <section
      id="newtail-media-banner"
      className="newtail-media-banner"
      style={{ textAlign: 'center' }}
    >
      {title && <span>{title}</span>}

      {banners.map((banner) => (
        <ItemBanner data={banner} key={banner.ad_id} />
      ))}
    </section>
  ) : (
    <></>
  )
}

export default Banners
