export function toQueryString(obj: ObjectMap): string {
  const params = new URLSearchParams(obj)
  return params.toString()
}