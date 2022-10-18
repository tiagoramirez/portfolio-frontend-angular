export function checkProtocolURL(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
    }
    return 'http://' + url
}
