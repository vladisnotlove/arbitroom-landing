
export type Position = {
    x: number,
    y: number,
}

export type Anchor = Position & {
    side: "top" | "left" | "right" | "bottom"
}
