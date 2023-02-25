const toggleDrawer = (drawer: Element) => {
    drawer.classList.toggle("open");

    if (drawer.classList.contains("open")) {
        document.documentElement.classList.add("drawer-open");
    } else {
        document.documentElement.classList.remove("drawer-open");
    }
}

export default toggleDrawer;