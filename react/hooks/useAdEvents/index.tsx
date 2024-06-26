import { useCallback } from 'react'

import { useSessionData } from '../useSessionData'

type UseAdEvents = () => {
  handleAdsEvents: (props: HandleAdEvents) => void
}

type HandleAdEvents = {
  event: ValidVtexEvent
  ads?: ProductAd[] | BannerAd[] | null | undefined
}

type FireEventBody =
  | {
      session_id: string
    } & {
      user_id: string
    }

export const useAdsEvents: UseAdEvents = () => {
  const { sessionId, userId } = useSessionData()

  const sendEvent = useCallback(
    (finalUrl: string) => {
      const body: FireEventBody = {
        session_id: sessionId as string,
      } as FireEventBody

      if (userId) {
        body.user_id = userId as string
      }

      navigator.sendBeacon(finalUrl, new URLSearchParams(body))
    },
    [sessionId, userId]
  )

  const fireEvent = useCallback(
    ({ url }) => {
      if (!sessionId) {
        let retries = 0
        const maxRetries = 5
        const interval = setInterval(() => {
          if (sessionId) {
            clearInterval(interval)
            sendEvent(url)
          }

          retries++
          if (retries >= maxRetries) {
            clearInterval(interval)
          }
        }, 1000)

        return
      }

      sendEvent(url)
    },
    [sendEvent, sessionId]
  )

  const handleAdsEvents = useCallback(
    ({ ads, event }: HandleAdEvents) => {
      const eventsKeys = {
        'vtex:productImpression': 'impression',
        'vtex:productView': 'view',
        'vtex:productClick': 'click',
      }

      const eventKey = eventsKeys[event]

      ads?.forEach((ad: ProductAd | BannerAd) => {
        let url = null
        const eventKeyUrl = `${eventKey}_url` as keyof EventsUrl

        url = ad?.[eventKeyUrl]

        !!url && fireEvent({ url })
      })
    },
    [fireEvent]
  )

  return { handleAdsEvents }
}
