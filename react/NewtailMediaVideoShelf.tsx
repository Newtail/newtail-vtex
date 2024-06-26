import React from 'react'

import ShelfWithVideo from './components/ShelfWithVideo'
import { NewtailMediaProvider } from './hooks/useNewtailMedia'

const NewtailMediaVideoShelf: React.FC = () => {
  return (
    <NewtailMediaProvider adType="product">
      <ShelfWithVideo />
    </NewtailMediaProvider>
  )
}

export default NewtailMediaVideoShelf
