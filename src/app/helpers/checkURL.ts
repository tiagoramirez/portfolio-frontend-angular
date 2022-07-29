export function checkURL(url: string): string {
    const reg = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})');
    let result = url;
    if (!result.includes('http://') && !result.includes('https://')) {
        result = "http://" + result;
    }
    if (reg.test(result)) {
        return result;
    }
    return "";
}