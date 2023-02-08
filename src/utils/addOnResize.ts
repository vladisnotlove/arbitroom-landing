import { throttle } from "throttle-debounce";

const addOnResize = (element: Element, onResize: () => void, options: { throttle?: number } = {}) => {
    const resizeObserver = new ResizeObserver(throttle(options.throttle ?? 100, onResize));
    resizeObserver.observe(element);

    return () => {
        resizeObserver.unobserve(element);
    }
}

export default addOnResize;