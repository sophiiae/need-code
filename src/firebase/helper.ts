export const parseKeyToString = (key: number) => {
  return key.toString().padStart(4, '0')
}

export const parseStringKeyToInt = (key: string) => {
  return parseInt(key)
}
