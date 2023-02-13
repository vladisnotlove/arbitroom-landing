export const clampNumber = (value: number, min: number, max: number) => {
    if (max < min) throw Error("'max' must be bigger than 'min' in function 'clampNumber'")
    if (value < min) return min;
    if (value > max) return max;
    return value;
}