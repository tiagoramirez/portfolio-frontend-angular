export function checkDate(date: Date): boolean {
    console.log(date);

    return date.getFullYear() >= 1900 && date.getFullYear() <= new Date().getFullYear()
}