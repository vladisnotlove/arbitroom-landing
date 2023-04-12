import { defineConfig } from "astro/config";
import htmlBeautifier from "./astro-html-beautifier";
import absoluteToRelative from "./astro-absolute-to-relative";

export default defineConfig({
    integrations: [
        htmlBeautifier(),
        absoluteToRelative()
    ]
});
