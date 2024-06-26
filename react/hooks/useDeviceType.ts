import { useMemo } from 'react'
import { useDevice } from 'vtex.device-detector'

export const useDeviceType = () => {
  const { isMobile } = useDevice()

  return useMemo(() => (isMobile ? 'mobile' : 'desktop'), [isMobile])
}
