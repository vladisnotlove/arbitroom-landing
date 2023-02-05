import ru from "./ru.json"
import flatten from "flat"

const flatRu = flatten(ru) as Record<string, string>

// FAKE i18next, while astro-i18next is not working

const t = (tKey: string) => {
    return flatRu[tKey] || tKey
}

const i18n = {
    language: "ru"
}

export default i18n
export { t }