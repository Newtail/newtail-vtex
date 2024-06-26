/* eslint-disable no-console */
import React from 'react'

import { NewtailMediaProvider } from './hooks/useNewtailMedia'
import Conversion from './components/Conversion'

const NewtailMediaConversion: React.FC = () => {
  return (
    <NewtailMediaProvider adType="conversion">
      <Conversion />
    </NewtailMediaProvider>
  )
}

export default NewtailMediaConversion
