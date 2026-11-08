const HONG_KONG_TIME_ZONE = 'Asia/Hong_Kong'

const hongKongDateFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: HONG_KONG_TIME_ZONE,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})

/** Formats an ISO timestamp as `YYYY年M月D日` in Hong Kong time. Returns '' for invalid input. */
export function formatDateZh(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''

  const parts = hongKongDateFormat.formatToParts(date)
  const valueOf = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value)

  return `${valueOf('year')}年${valueOf('month')}月${valueOf('day')}日`
}
