export function formalDateJa(isoDate: string) {
  const d = new Date(isoDate)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

