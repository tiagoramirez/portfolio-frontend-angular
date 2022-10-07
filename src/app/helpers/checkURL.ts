export function checkURL(url: string): string {
    const reg = /(https?:\/\/(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?:\/\/(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})/
    let result = url
    if (!reg.test(result)) {
        return ''
    }
    if (result.startsWith('http://') || result.startsWith('https://')) {
        return result
    }
    result = 'http://' + result
    return result
}
