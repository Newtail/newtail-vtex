/* eslint-disable no-console */
import type { PropsWithChildren } from 'react'
import React from 'react'
import { defineMessages } from 'react-intl'

import { NewtailMediaProvider } from './hooks/useNewtailMedia'
import Banner from './components/Banner'

function NewtailMediaBanner(props: PropsWithChildren<NewtailMediaBannerProps>) {
  // console.log('🔵 🟡 🔵 🟡 Carregou Newtail Media :: Banner 🔵 🟡 🔵 🟡')

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
  'common.placementNameAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.placementNameAdmin.title',
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
      default: 'dekstop',
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
