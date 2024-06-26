import { useMemo } from 'react'

import { useDeviceType } from '../useDeviceType'
import { useQueryTerm } from '../useQueryTerm'
import { useSessionData } from '../useSessionData'

type FormatRequestBodyProps = {
  skus: string[]
  placement: string
  quantityAds?: number
}

type FormatRequestBody = (props: FormatRequestBodyProps) => null | RequestBody

export const useRequestBody: FormatRequestBody = ({
  skus,
  placement = 'search',
  quantityAds = 20,
}) => {
  const { sessionId, userId } = useSessionData()
  const term = useQueryTerm()
  const device = useDeviceType()

  return useMemo(
    () =>
      !sessionId
        ? null
        : ({
            skus,
            device,
            term,
            user_id: userId,
            session_id: sessionId,
            context: 'search',
            placements: {
              [placement]: {
                size: device,
                quantity: quantityAds,
                types: ['product'],
              },
            },
          } as RequestBody),
    [device, placement, quantityAds, sessionId, skus, term, userId]
  )
}
