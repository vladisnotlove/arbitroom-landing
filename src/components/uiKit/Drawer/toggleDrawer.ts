let timeoutId = -1;

const toggleDrawer = (drawer: Element) => {
    drawer.classList.toggle("open");

    if (timeoutId !== -1) window.clearTimeout(timeoutId);

    if (drawer.classList.contains("open")) {
        document.documentElement.classList.add("drawer-open");
    } else {
        const styles = getComputedStyle(drawer);
        const time = (parseFloat(styles.transitionDelay) + parseFloat(styles.transitionDuration)) * 1000;
        timeoutId = window.setTimeout(() => {
            document.documentElement.classList.remove("drawer-open");
        }, time)
    }
}

export default toggleDrawer;