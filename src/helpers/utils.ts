export const isValidIP = (str: string): boolean => {
  const ip = str.split('.')
  if (ip.length !== 4) return false
  for (let i = 0; i < ip.length; i++) {
    if (
      !/^\d+$/g.test(ip[i]) ||
      +ip[i] > 255 ||
      +ip[i] < 0 ||
      /^[0][0-9]{1,2}/.test(ip[i])
    ) { return false }
  }
  return true
}
