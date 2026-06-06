export function formalDateJa(isoDate: string) {
  const d = new Date(isoDate)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

export function formalFullTimeJa(isoTime: string) {
  const d = new Date(isoTime)
  return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}時${d.getMinutes()}分`
}

