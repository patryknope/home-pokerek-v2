
function isLongerThanZero(s: string): boolean {
    return s.length > 0;
}

export function containsTextInFields(
    fields: (string | number)[],
    textToFind: string | number
): boolean {
    return textToFind
        .toString()
        .toLowerCase()
        .split(" ")
        .filter(isLongerThanZero)
        .every((word) => {
            return fields.some((field => {
                return field.toString().toLowerCase().includes(word)}))
        })
}