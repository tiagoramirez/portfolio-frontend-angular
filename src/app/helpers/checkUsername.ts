export function checkUsername (username: string): boolean {
    const reg = /^[a-zA-Z0-9]{4,10}$/
    return reg.test(username)
}
