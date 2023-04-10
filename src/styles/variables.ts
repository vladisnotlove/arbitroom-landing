import scssVariables from "@styles/variables.module.scss";

const variables = {
    desktop: parseFloat(scssVariables["desktop"]),
    smallDesktop: parseFloat(scssVariables["small-desktop"]),
    laptop: parseFloat(scssVariables["laptop"]),
    smallLaptop: parseFloat(scssVariables["small-laptop"]),
    tablet: parseFloat(scssVariables["tablet"]),
    smallTablet: parseFloat(scssVariables["small-tablet"]),
    mobile: parseFloat(scssVariables["mobile"]),
}

export default variables;