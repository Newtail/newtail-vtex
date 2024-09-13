/* eslint-disable no-console */
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { defineMessages } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import Shelf from './components/Shelf'
import { NewtailMediaProvider } from './hooks/useNewtailMedia'

function NewtailMediaShelf(props: PropsWithChildren<NewtailMediaShelfProps>) {
  const { query: queryRaw } = useRuntime()

  const debug = useMemo(() => queryRaw?.debug ?? null, [queryRaw])

  if (debug === 'newtail') {
    console.log(
      '%c 🚧 🚧 🚧 🚧  NewtailMedia :: Shelf 🚧 🚧 🚧 🚧',
      'color:#ffb450;background:#3c3584;'
    )
    console.log(
      '%c 🚀 ~ NewtailMediaShelf ~ props:',
      'color:white;background:#3c3584;',
      props
    )
  }

  const isActive = props.active ?? true

  if (!isActive) return <></>

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
  'common.active.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.active.title',
    defaultMessage: '',
  },
  'common.placementNameAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.placementNameAdmin.title',
    defaultMessage: '',
  },
  'shelf.placementNameAdmin.description': {
    id: 'admin/newtailpartnerbr-newtail-media.shelf.placementNameAdmin.description',
    defaultMessage: '',
  },
  'common.quantityAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.quantityAdmin.title',
    defaultMessage: '',
  },
  'common.quantityAdmin.product.description': {
    id: 'admin/newtailpartnerbr-newtail-media.common.quantityAdmin.product.description',
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
