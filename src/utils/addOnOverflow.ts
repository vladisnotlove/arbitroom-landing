import { throttle } from "throttle-debounce";

type OverflowState = "overflow" | "normal";

const getState = (element: Element): OverflowState => {
    if (element.scrollHeight > element.clientHeight) return "overflow";
    if (element.scrollWidth > element.clientWidth) return "overflow";
    return "normal";
}

const addOnOverflow = (element: Element, onOverflow: (state: OverflowState) => void, options: { throttle?: number } = {}) => {
    let prevState = getState(element);

    onOverflow(prevState);

    const resizeObserver = new ResizeObserver(throttle(options.throttle ?? 100, () => {
        const state = getState(element);
        if (prevState !== state) onOverflow(state);
        prevState = state;
    }));
    resizeObserver.observe(element);

    return () => {
        resizeObserver.unobserve(element);
    }
}

export default addOnOverflow;