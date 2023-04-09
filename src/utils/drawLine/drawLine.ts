import Vector from "../Vector"
import type { Position, Anchor } from "./types";
import { anchorSideToDirection, getPositionBetween, getPositionsDiff, getPositionsLength } from "./helpers";

// main type

type DrawLineOptions = {
    radius?: number
};

// helpers

const getAllCanditateAnchors = (rect: DOMRect): { top: Anchor, right: Anchor, bottom: Anchor, left: Anchor } => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;

    return {
        // top
        top: {
            side: "top",
            x: scrollLeft + rect.left + rect.width * 0.5,
            y: scrollTop + rect.top,
        },
        // right
        right: {
            side: "right",
            x: scrollLeft + rect.right,
            y: scrollTop + rect.top + rect.height * 0.5,
        },
        // bottom
        bottom: {
            side: "bottom",
            x: scrollLeft + rect.left + rect.width * 0.5,
            y: scrollTop + rect.bottom,
        },
        // left
        left: {
            side: "left",
            x: scrollLeft + rect.left,
            y: scrollTop + rect.top + rect.height * 0.5,
        },
    };
}

const calculateAnchors = (startRect: DOMRect, endRect: DOMRect) => {
    let startCandidates = getAllCanditateAnchors(startRect);
    let endCandidates = getAllCanditateAnchors(endRect);

    if (startCandidates.top.y > endCandidates.bottom.y) {
        return {
            startAnchor: startCandidates.top,
            endAnchor: endCandidates.bottom,
        }
    }

    if (startCandidates.bottom.y < endCandidates.top.y) {
        return {
            startAnchor: startCandidates.bottom,
            endAnchor: endCandidates.top,
        }
    }
    if (startCandidates.left.x > endCandidates.right.x) {
        return {
            startAnchor: startCandidates.left,
            endAnchor: endCandidates.right,
        }
    }
    // if (startCandidates.right.x < endCandidates.left.x) 
    return {
        startAnchor: startCandidates.right,
        endAnchor: endCandidates.left,
    }
}

const calclulateSvgRect = (startPosition: { x: number, y: number }, endPosition: { x: number, y: number }) => {
    const top = Math.min(startPosition.y, endPosition.y);
    const left = Math.min(startPosition.x, endPosition.x);
    const bottom = Math.max(startPosition.y, endPosition.y);
    const right = Math.max(startPosition.x, endPosition.x);

    return {
        top,
        left,
        bottom,
        right,
        width: Math.max(right - left, 1),
        height: Math.max(bottom - top, 1),
    }
}

const pointsToSmoothPath = (points: Vector[], radius: number) => {
    let d = ""
    d += `M ${points[0].x}, ${points[0].y}\n`;

    for (let i = 1; i < points.length - 1; i++) {
        const a = points[i - 1];
        const b = points[i];
        const c = points[i + 1];

        const ab = b.subtract(a);
        const ar = ab.normalize().multiply(Math.max(ab.length - radius, 0)).add(a);

        const cb = b.subtract(c);
        const cr = cb.normalize().multiply(Math.max(cb.length - radius, 0)).add(c);

        d += `L ${ar.x},${ar.y}\n`;
        d += `Q ${b.x},${b.y} ${cr.x},${cr.y}\n`;
    }
    d += `L ${points[points.length - 1].x}, ${points[points.length - 1].y}\n`;
    return d;
}

const calculatePath = (startAnchor: Anchor, endAnchor: Anchor, radius: number) => {
    const startDirection = anchorSideToDirection(startAnchor.side);
    const endDirection = anchorSideToDirection(endAnchor.side);
    const center = getPositionBetween(startAnchor, endAnchor);
    const diff = getPositionsDiff(startAnchor, endAnchor);

    if (Math.abs(startDirection.x) === Math.abs(endDirection.x) || Math.abs(startDirection.y) === Math.abs(endDirection.y)) {
        const points = [
            new Vector(
                startAnchor.x,
                startAnchor.y
            ),
            new Vector(
                startAnchor.x + startDirection.x * center.x,
                startAnchor.y + startDirection.y * center.y
            ),
            new Vector(
                endAnchor.x + endDirection.x * center.x,
                endAnchor.y + endDirection.y * center.y
            ),
            new Vector(
                endAnchor.x,
                endAnchor.y
            )
        ]
        return pointsToSmoothPath(points, radius);
    }
    else {
        const points = [
            new Vector(
                startAnchor.x,
                startAnchor.y
            ),
            new Vector(
                startAnchor.x + startDirection.x * diff.x,
                startAnchor.y + startDirection.y * diff.y
            ),
            new Vector(
                endAnchor.x,
                endAnchor.y
            )
        ]

        return pointsToSmoothPath(points, radius);
    }
}

// main

const defaultOptions: Required<DrawLineOptions> = {
    radius: 0
}

const drawLine = (
    start: Element,
    end: Element,
    options: DrawLineOptions = {}
): Element | null => {
    const _options: Required<DrawLineOptions> = {
        radius: options.radius ?? defaultOptions.radius
    }

    const startRect = start.getBoundingClientRect();
    const endRect = end.getBoundingClientRect();

    const { startAnchor, endAnchor } = calculateAnchors(startRect, endRect);
    const svgRect = calclulateSvgRect(startAnchor, endAnchor);
    const d = calculatePath(
        {
            ...startAnchor,
            x: startAnchor.x - svgRect.left,
            y: startAnchor.y - svgRect.top,
        },
        {
            ...endAnchor,
            x: endAnchor.x - svgRect.left,
            y: endAnchor.y - svgRect.top,
        },
        _options.radius
    );

    const svgString =
        `<svg class="svg-line" style="position: absolute; top: ${svgRect.top}px; left: ${svgRect.left}px; width: ${svgRect.width}px; height: ${svgRect.height}px; overflow: visible">
            <path d="${d}" fill="none"></path>
        </svWSg>`;


    document.body.insertAdjacentHTML("beforeend", svgString);
    const svg = document.body.lastElementChild;

    return svg;
}


export default drawLine