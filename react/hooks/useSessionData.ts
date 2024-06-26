import { useMemo } from 'react'
import type { SessionSuccess } from 'vtex.session-client'
import { useRenderSession } from 'vtex.session-client'

export const useSessionData = () => {
  const { session } = useRenderSession() as { session: SessionSuccess }

  const sessionId = useMemo(() => session?.id || null, [session])
  const userId = useMemo(
    () => session?.namespaces?.profile?.id?.value || null,
    [session]
  )

  return { sessionId, userId }
}
