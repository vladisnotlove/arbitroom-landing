import ru from "./ru.json"
import flatten from "flat"

const flatRu = flatten(ru) as Record<string, string>

// FAKE i18next, while astro-i18next is not working

const t = (tKey: string) => {
    return flatRu[tKey] || tKey
}

const i18next = {
    language: "ru"
}

export default i18next
export { t }