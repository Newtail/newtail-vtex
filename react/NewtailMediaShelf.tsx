/* eslint-disable no-console */
import type { PropsWithChildren } from 'react'
import React from 'react'
import { defineMessages } from 'react-intl'

import Shelf from './components/Shelf'
import { NewtailMediaProvider } from './hooks/useNewtailMedia'

function NewtailMediaShelf(props: PropsWithChildren<NewtailMediaShelfProps>) {
  // console.log('🔵 🟡 🔵 🟡 Carregou Newtail Media :: Shelf 🔵 🟡 🔵 🟡')

  return (
    <NewtailMediaProvider adType="product" {...props}>
      <Shelf />
    </NewtailMediaProvider>
  )
}

const messages = defineMessages({
  'shelf.title': {
    id: 'admin/newtailpartnerbr-newtail-media.shelf.title',
    defaultMessage: '',
  },
  'common.placementNameAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.placementNameAdmin.title',
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

NewtailMediaShelf.schema = {
  title: messages['shelf.title'].id,
  type: 'object',
  properties: {
    placementName: {
      default: 'products',
      isLayout: true,
      type: 'string',
    },
    quantity: {
      default: 20,
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

export default NewtailMediaShelf
