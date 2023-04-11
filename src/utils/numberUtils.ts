export const clampNumber = (value: number, min: number, max: number) => {
    if (max < min) throw Error("'max' must be bigger than 'min' in function 'clampNumber'")
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}