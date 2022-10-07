export function checkPhoneNumber(phoneNumber: string): boolean {
    let number = phoneNumber;
    if (phoneNumber.startsWith("+")) {
        number = phoneNumber.substring(1);
    }
    return /^\d+$/.test(number)
}
