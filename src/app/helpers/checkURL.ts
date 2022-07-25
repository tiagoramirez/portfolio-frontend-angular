export function checkURL(url: string): string {
    let result = url;
    if (!url.includes('http://') || !url.includes('https://')) {
        result = "http://" + result;
    }
    return result;
}