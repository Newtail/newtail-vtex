/* eslint-disable no-console */
import type { PropsWithChildren } from 'react'
import React from 'react'
import { defineMessages } from 'react-intl'

import Search from './components/Search'
import { NewtailMediaSearchProvider } from './hooks/useNewtailMediaSearch'
import * as D from './settings'

function NewtailMediaSearch(props: PropsWithChildren<NewtailMediaSearchProps>) {
  // console.log('🔵 🟡 🔎📚 Carregou Newtail Media :: Search 🔎📚 🔵 🟡')

  return (
    <NewtailMediaSearchProvider {...props}>
      <Search />
    </NewtailMediaSearchProvider>
  )
}

const messages = defineMessages({
  searchTitle: {
    id: 'admin/newtailpartnerbr-newtail-media.search.title',
    defaultMessage: '',
  },
  'common.quantityAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.quantityAdmin.title',
    defaultMessage: '',
  },
  'common.placementNameAdmin.title': {
    id: 'admin/newtailpartnerbr-newtail-media.common.placementNameAdmin.title',
    defaultMessage: '',
  },
  'search.tagText.title': {
    id: 'admin/newtailpartnerbr-newtail-media.search.tagText.title',
    defaultMessage: '',
  },
  'search.tagText.description': {
    id: 'admin/newtailpartnerbr-newtail-media.search.tagText.description',
    defaultMessage: '',
  },
  'search.tagPosition.title': {
    id: 'admin/newtailpartnerbr-newtail-media.search.tagPosition.title',
    defaultMessage: '',
  },
  'search.tagPosition.description': {
    id: 'admin/newtailpartnerbr-newtail-media.search.tagPosition.description',
    defaultMessage: '',
  },
  'search.tagPosition.start': {
    id: 'admin/newtailpartnerbr-newtail-media.search.tagPosition.start',
    defaultMessage: '',
  },
  'search.tagPosition.end': {
    id: 'admin/newtailpartnerbr-newtail-media.search.tagPosition.end',
    defaultMessage: '',
  },
  'search.tagClassname.title': {
    id: 'admin/newtailpartnerbr-newtail-media.search.tagClassname.title',
    defaultMessage: '',
  },
  'search.tagClassname.description': {
    id: 'admin/newtailpartnerbr-newtail-media.search.tagClassname.description',
    defaultMessage: '',
  },
  'search.parentSearchSelector.title': {
    id: 'admin/newtailpartnerbr-newtail-media.search.parentSearchSelector.title',
    defaultMessage: '',
  },
  'search.parentSearchSelector.description': {
    id: 'admin/newtailpartnerbr-newtail-media.search.parentSearchSelector.description',
    defaultMessage: '',
  },
  'search.onlyFirstSKU.title': {
    id: 'admin/newtailpartnerbr-newtail-media.search.onlyFirstSKU.title',
    defaultMessage: '',
  },
})

NewtailMediaSearch.schema = {
  title: messages.searchTitle.id,
  type: 'object',
  properties: {
    quantity: {
      default: 20,
      isLayout: true,
      type: 'string',
    },
    onlyFirstSKU: {
      default: false,
      isLayout: true,
      type: 'string',
    },
    parentSearchSelector: {
      default: D.searchSelectorDefault,
      isLayout: true,
      type: 'string',
    },
    placementName: {
      default: 'search',
      isLayout: true,
      type: 'string',
    },
    tagClassname: {
      default: D.tagClassnameDefault,
      isLayout: true,
      type: 'string',
    },
    tagPosition: {
      default: 'start',
      isLayout: true,
      type: 'string',
    },
    tagText: {
      isLayout: true,
      type: 'string',
    },
    sponsoredSkusAtTop: {
      default: true,
      isLayout: true,
      type: 'boolean',
    },
  },
}

export default NewtailMediaSearch
