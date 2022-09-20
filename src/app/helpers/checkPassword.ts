export function checkPassword (pass: string): boolean {
    const reg = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/
    return reg.test(pass)
}
