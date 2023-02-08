import type { Position, Anchor } from "./types";

export const getPositionBetween = (a: Position, b: Position): Position => {
    const diff = {
        x: a.x + b.x * 0.5,
        y: a.y + b.y * 0.5
    };
    return {
        x: diff.x,
        y: diff.y
    }
}

export const getPositionsDiff = (a: Position, b: Position): Position => {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}

export const getPositionsLength = (a: Position, b: Position): number => {
    const diff = getPositionsDiff(b, a);
    return Math.sqrt(diff.x * diff.x + diff.y * diff.y)
}


export const anchorSideToDirection = (side: Anchor["side"]): Position => {
    return {
        x: side === "left" ? -1 : (side === "right" ? 1 : 0),
        y: side === "top" ? -1 : (side === "bottom" ? 1 : 0),
    }
}