/* eslint-disable no-console */
export default function push(
  rawEvent: Record<string, unknown>,
  eventName?: string
) {
  console.log('⭐', rawEvent, eventName)
}
