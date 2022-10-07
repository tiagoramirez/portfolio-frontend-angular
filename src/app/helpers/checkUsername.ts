export function checkUsername(username: string): boolean {
    const reg = /^[a-zA-Z0-9_]+[a-zA-Z0-9._]{4,15}$/
    return reg.test(username)
}
