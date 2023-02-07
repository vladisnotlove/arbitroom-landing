
import { rawT, TKey } from "./main";
import { valid } from 'node-html-parser';


const splitHTML = (html: string) => {
    const separator = "_12%39#1$f"
    return html
        .split("<").join(separator + "<" + separator)
        .split(">").join(separator + ">" + separator)
        .split(separator);
}

export const interpolate = (key: TKey, referenceString: string) => {
    const originalString = rawT(key);

    const referenceParts = splitHTML(referenceString);
    const originalParts = splitHTML(originalString);

    let insideTag = false;
    const interpolatedParts = referenceParts.map((part, index) => {
        if (part === "<") {
            insideTag = true;
            return part;
        }
        if (part === ">") {
            insideTag = false;
            return part;
        }
        if (insideTag) {
            return part;
        }
        else {
            return originalParts[index] || part || "";
        }
    });
    const interpolatedString = interpolatedParts.join("");

    if (!valid(`<div>${interpolatedString}</div>`)) {
        throw Error(`String: \n\n"${referenceString}"\n\n cannot be interpolated with key "${key}"`)
    }

    return interpolatedString;
};