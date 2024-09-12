/* eslint-disable no-console */
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { defineMessages } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { NewtailMediaProvider } from './hooks/useNewtailMedia'
import Banner from './components/Banner'

function NewtailMediaBanner(props: PropsWithChildren<NewtailMediaBannerProps>) {
  const { query: queryRaw } = useRuntime()

  const debug = useMemo(() => queryRaw?.debug ?? null, [queryRaw])

  if (debug === 'newtail') {
    console.log(
      '%c 🚧 🚧 🚧 🚧  NewtailMedia :: Banner 🚧 🚧 🚧 🚧',
      'color:#ffb450;background:#3c3584;'
    )
    console.log(
      '%c 🚀 ~ NewtailMediaBanner ~ props:',
      'color:white;background:#3c3584;',
      props
    )
  }

  if (!props?.active) return <></>

  return (
    <NewtailMediaProvider adType="banner" {...props}>
      <Banner />
    </NewtailMediaProvider>
  )
}

const messages = defineMessages({
  'banner.title': {
    id: 'admin/newtailpartnerbr-newtail-media.banner.title',
    defaultMessage: '',
  },
  'common.active.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.active.title',
    defaultMessage: '',
  },
  'common.placementNameAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.placementNameAdmin.title',
    defaultMessage: '',
  },
  'banner.placementNameAdmin.description': {
    id: 'admin/newtailpartnerbr-newtail-media.banner.placementNameAdmin.description',
    defaultMessage: '',
  },
  'banner.sizeAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.banner.sizeAdmin.title',
    defaultMessage: '',
  },
  'banner.sizeAdmin.description': {
    id: 'admin/newtailpartnerbr-newtail-media.banner.sizeAdmin.description',
    defaultMessage: '',
  },
  'banner.sizeMobileAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.banner.sizeMobileAdmin.title',
    defaultMessage: '',
  },
  'banner.sizeMobileAdmin.description': {
    id: 'admin/newtailpartnerbr-newtail-media.banner.sizeMobileAdmin.description',
    defaultMessage: '',
  },
  'common.quantityAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.quantityAdmin.title',
    defaultMessage: '',
  },
  'common.quantityAdmin.banner.description': {
    id: 'admin/newtailpartnerbr-newtail-media.common.quantityAdmin.banner.description',
    defaultMessage: '',
  },
  'common.categoryNameAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.categoryNameAdmin.title',
    defaultMessage: '',
  },
  'common.categoryNameAdmin.description': {
    id: 'admin/newtailpartnerbr-newtail-media.common.categoryNameAdmin.description',
    defaultMessage: '',
  },
})

NewtailMediaBanner.schema = {
  title: messages['banner.title'].id,
  type: 'object',
  properties: {
    placementName: {
      default: 'banner',
      isLayout: true,
      type: 'string',
    },
    size: {
      default: 'banner',
      isLayout: true,
      type: 'string',
    },
    sizeMobile: {
      default: null,
      isLayout: true,
      type: 'string',
    },
    quantity: {
      default: 1,
      isLayout: true,
      type: 'string',
    },
    categoryName: {
      default: null,
      isLayout: true,
      type: 'string',
    },
  },
}

export default NewtailMediaBanner
