export function checkUsername(username: string): boolean {
    const reg = new RegExp('^[a-zA-Z0-9]{4,10}$');
    return reg.test(username);
}