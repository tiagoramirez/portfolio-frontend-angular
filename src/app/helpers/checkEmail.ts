export function checkEmail (email: string): boolean {
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (email.match(reg) != null) {
    return true
  }
  return false
}
